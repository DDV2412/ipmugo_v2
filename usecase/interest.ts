class InterestUC {
  Interest: any;
  constructor(Interest: any) {
    this.Interest = Interest;
  }

  allInterests = async (filters: {}) => {
    return await this.Interest.allInterests(filters);
  };

  searchByElastic = async (filters: {}) => {
    return await this.Interest.searchByElastic(filters);
  };

  interestById = async (id: string) => {
    return await this.Interest.interestById(id);
  };
  createInterest = async (interestData: any) => {
    return await this.Interest.createInterest(interestData);
  };

  updateInterest = async (interest: any, interestData: any) => {
    return await this.Interest.updateInterest(interest, interestData);
  };

  deleteInterest = async (interest: any) => {
    return await this.Interest.deleteInterest(interest);
  };
}

export default InterestUC;
