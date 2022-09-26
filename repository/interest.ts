import db from "../models";
import Interest from "../models/interest";
import loggerWinston from "../helper/logger-winston";
import ElasticRepo from "./elastic";

class InterestRepo {
  Interest: typeof Interest;
  Elastic: any;
  constructor() {
    this.Interest = Interest;
    this.Elastic = new ElasticRepo();
  }

  allInterests = async () => {
    try {
      let interests = await db.transaction(async (transaction) => {
        return await this.Interest.findAndCountAll({
          transaction,
        });
      });

      return interests;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  interestById = async (id: string) => {
    try {
      let interest = await db.transaction(async (transaction) => {
        return await this.Interest.findOne({
          where: {
            id: id,
          },
          transaction,
        });
      });

      return interest;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  searchByElastic = async (filters: {}) => {
    try {
      const _search = filters["name"]
        ? {
            from: filters["from"] ? filters["from"] - 1 : 0,
            size: filters["size"],
            query: {
              match: {
                name: filters["name"],
              },
            },
          }
        : {
            size: 10000,
            query: {
              match_all: {},
            },
          };

      let interests = await this.Elastic.search("interests", _search);

      return interests;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  createInterest = async (interestData: any) => {
    try {
      let interest = await db.transaction(async (transaction) => {
        return await this.Interest.create(interestData);
      });

      return interest;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  updateInterest = async (interest: any, interestData: any) => {
    try {
      let update = await db.transaction(async (transaction) => {
        return await interest.update(interestData, transaction);
      });

      return update;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  deleteInterest = async (interest: any) => {
    try {
      let results = await db.transaction(async () => {
        return await interest.destroy();
      });

      return results;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };
}

export default InterestRepo;
