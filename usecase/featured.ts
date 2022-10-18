class FeatruredUC {
  featuredRepo: any;
  constructor(featuredRepo: any) {
    this.featuredRepo = featuredRepo;
  }

  search = async (search: {}) => {
    return await this.featuredRepo.search(search);
  };

  scroll = async (scroll_id: string) => {
    return await this.featuredRepo.scroll(scroll_id);
  };

  contact = async (message: {}) => {
    return this.featuredRepo.contact(message);
  };

  subscribe = async (subscriber: {}) => {
    return this.featuredRepo.subscribe(subscriber);
  };

  subscribeList = async (page: number, size: number, filters: string) => {
    return this.featuredRepo.subscribeList(page, size, filters);
  };

  contactList = async (page: number, size: number, filters: string) => {
    return this.featuredRepo.contactList(page, size, filters);
  };

  contactDetail = async (id: string) => {
    return this.featuredRepo.contactDetail(id);
  };
}

export default FeatruredUC;
