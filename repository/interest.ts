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
      let update = await db.transaction(async (transaction) => {
        return await this.Interest.update(interestData, {
          where: {
            id: interest_id,
          },
          transaction,
        });
      });

      return update;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };

  deleteInterest = async (interest_id: string) => {
    try {
      let results = await db.transaction(async (transaction) => {
        return await this.Interest.destroy({
          where: {
            id: interest_id,
          },
          transaction,
        });
      });

      return results;
    } catch (error) {
      loggerWinston.error(error);
      return null;
    }
  };
}

export default InterestRepo;
