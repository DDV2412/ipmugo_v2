class RequestPagination {
  page: number;
  size: number;
  limit: number;
  offset: number;

  constructor(page: number, size: number) {
    this.page = page;
    this.size = size;

    this.limit = this.size ? +this.size : 15;
    this.offset = this.page ? (this.page - 1) * this.limit : 0;
  }
}

export default RequestPagination;
