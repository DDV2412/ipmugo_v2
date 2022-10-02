class FeatruredUC {
  featuredRepo: any;
  constructor(featuredRepo: any) {
    this.featuredRepo = featuredRepo;
  }

  search = async (search: {}) => {
    return await this.featuredRepo.search(search);
  };
}

export default FeatruredUC;
