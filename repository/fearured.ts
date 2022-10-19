import elastic from "../models/elastic";
import { Client } from "@elastic/elasticsearch";
import { Elastic } from "../types/elastic";
import ElasticType = Elastic.SearchBody;
import loggerWinston from "../helper/logger-winston";
import Contact from "../models/contact";
import Subscription from "../models/subscription";
import db from "../models";
import RequestPagination from "../helper/requestPagination";
import { Op } from "sequelize";

class FeatruredRepo {
  client: Client;
  Contact: typeof Contact;
  Subscription: typeof Subscription;
  constructor() {
    this.client = elastic.client;
    this.Contact = Contact;
    this.Subscription = Subscription;
  }

  bulk = async (dataSet: Array<Record<string, string>>, options: any) => {
    const isExists = await this.client.indices.exists({
      index: options["indexName"],
    });

    if (!isExists) {
      await this.client.indices.create(
        {
          index: options["indexName"],
          body: {
            mappings: {
              properties: options["properties"],
            },
          },
        },
        { ignore: [400] }
      );
    } else {
      await this.client.indices.delete({
        index: options["indexName"],
      });

      await this.client.indices.create(
        {
          index: options["indexName"],
          body: {
            mappings: {
              properties: options["properties"],
            },
          },
        },
        { ignore: [400] }
      );
    }

    const operations = await dataSet.flatMap((doc) => [
      {
        index: {
          _index: options["indexName"],
          _id: doc["id"],
        },
      },
      doc,
    ]);

    const bulkRes = await this.client.bulk({
      refresh: true,
      operations: operations,
    });

    if (bulkRes.errors) {
      const errorDoc: any = [];

      bulkRes.items.forEach((action, i) => {
        const operation = Object.keys(action)[0];
        if (action[operation].error) {
          errorDoc.push({
            status: action[operation].status,
            error: action[operation].error,
          });
        }
      });

      loggerWinston.error(errorDoc);
    }
  };

  search = async (search: {}) => {
    try {
      const articles = await this.client.search<ElasticType>({
        index: search["indexName"],
        body: search["body"],
      });

      const total = await this.client.count({
        index: search["indexName"],
        body: {
          query: search["body"]["query"],
        },
      });

      const aggregations = await this.client.search<ElasticType>({
        index: search["indexName"],
        body: {
          query: {
            bool: {
              must: {
                match_all: {},
              },
            },
          },
          aggs: {
            topic: {
              terms: {
                field: "topic",
                size: 10000,
              },
            },
            journal: {
              terms: {
                field: "journal.name",
                size: 10000,
              },
            },
            min_year: { min: { field: "publish_date", format: "yyyy" } },
            max_year: { max: { field: "publish_date", format: "yyyy" } },
          },
        },
      });

      return {
        total: total["count"],
        currentPage: search["body"]["page"],
        countPage: Math.ceil(total["count"] / search["body"]["size"]),
        articles: articles,
        aggregations: aggregations["aggregations"],
      };
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  contact = async (contact: any) => {
    try {
      return await db.transaction(async (transaction) => {
        return await this.Contact.create(contact);
      });
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  subscribe = async (subscriber: any) => {
    try {
      return await db.transaction(async (transaction) => {
        return await this.Subscription.create(subscriber);
      });
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  subscribeList = async (page: number, size: number, filters: string) => {
    try {
      const { limit, offset } = new RequestPagination(page, size);

      let where =
        typeof filters != "undefined"
          ? {
              [Op.or]: {
                name: { [Op.like]: `%${filters}%` },
                email: { [Op.like]: `%${filters}%` },
              },
            }
          : {};

      let subscribe = await db.transaction(async (transaction) => {
        return await this.Subscription.findAndCountAll({
          where: where,
          limit: limit,
          offset: offset,
          distinct: true,
          transaction,
        });
      });

      return {
        total: subscribe.count,
        currentPage: page ? +page : 0,
        countPage: Math.ceil(subscribe.count / limit),
        subscribe: subscribe.rows,
      };
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };
  contactList = async (page: number, size: number, filters: string) => {
    try {
      const { limit, offset } = new RequestPagination(page, size);

      let where =
        typeof filters != "undefined"
          ? {
              [Op.or]: {
                name: { [Op.like]: `%${filters}%` },
                email: { [Op.like]: `%${filters}%` },
              },
            }
          : {};

      let contact = await db.transaction(async (transaction) => {
        return await this.Contact.findAndCountAll({
          where: where,
          limit: limit,
          offset: offset,
          distinct: true,
          transaction,
        });
      });

      return {
        total: contact.count,
        currentPage: page ? +page : 0,
        countPage: Math.ceil(contact.count / limit),
        contact: contact.rows,
      };
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };
  contactDetail = async (id: string) => {
    try {
      let contact = await db.transaction(async (transaction) => {
        return await this.Contact.findOne({
          where: {
            id: id,
          },
          transaction,
        });
      });

      return contact;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };
}

export default FeatruredRepo;
