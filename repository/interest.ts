import db from "../models";
import Interest from "../models/interest";

class InterestRepo {
  Interest: typeof Interest;

  constructor() {
    this.Interest = Interest;
  }

  allInterests = async (filters: {}) => {
    try {
      let where = filters["search"]
        ? {
            name: filters["search"],
          }
        : {};

      let interests = await db.transaction(async (transaction) => {
        return await this.Interest.findAndCountAll({
          where: where,
          distinct: true,
          transaction,
        });
      });

      return interests;
    } catch (error) {
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
    } catch (err: any) {
      return null;
    }
  };

  createInterest = async (interestData: any) => {
    try {
      let interest = await db.transaction(async (transaction) => {
        return await this.Interest.create(interestData);
      });

      return interest;
    } catch (error: any) {
      return error["message"];
    }
  };

  updateInterest = async (interest: any, interestData: any) => {
    try {
      let update = await db.transaction(async (transaction) => {
        return await interest.update(interestData, transaction);
      });

      return update;
    } catch (error: any) {
      return error["message"];
    }
  };

  deleteInterest = async (interest: any) => {
    try {
      let results = await db.transaction(async () => {
        return await interest.destroy();
      });

      return results;
    } catch (error: any) {
      return error["message"];
    }
  };
}

export default InterestRepo;
