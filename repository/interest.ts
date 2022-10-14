import db from "../models";
import Interest from "../models/interest";
import loggerWinston from "../helper/logger-winston";

class InterestRepo {
  Interest: typeof Interest;
  constructor() {
    this.Interest = Interest;
  }

  allInterests = async () => {
    try {
      return await db.transaction(async (transaction) => {
        return await this.Interest.findAndCountAll({
          transaction,
        });
      });
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  interestById = async (id: string) => {
    try {
      return await db.transaction(async (transaction) => {
        return await this.Interest.findOne({
          where: {
            id: id,
          },
          transaction,
        });
      });
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

  updateInterest = async (interest_id: string, interestData: any) => {
    try {
      return await db.transaction(async (transaction) => {
        return await this.Interest.update(interestData, {
          where: {
            id: interest_id,
          },
          transaction,
        });
      });
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  deleteInterest = async (interest_id: string) => {
    try {
      return await db.transaction(async (transaction) => {
        return await this.Interest.destroy({
          where: {
            id: interest_id,
          },
          transaction,
        });
      });
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };
}

export default InterestRepo;
