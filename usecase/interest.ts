class InterestUC {
  Interest: any;
  constructor(Interest: any) {
    this.Interest = Interest;
  }

  allInterests = async (id: string) => {
    return await this.Interest.allInterests(id);
  };

  interestById = async (id: string) => {
    return await this.Interest.interestById(id);
  };
  createInterest = async (interestData: Record<string, any>) => {
    return await this.Interest.createInterest(interestData);
  };

  updateInterest = async (
    interest_id: string,
    interestData: Record<string, any>
  ) => {
    return await this.Interest.updateInterest(interest_id, interestData);
  };

  deleteInterest = async (interest_id: string) => {
    return await this.Interest.deleteInterest(interest_id);
  };
}

export default InterestUC;
