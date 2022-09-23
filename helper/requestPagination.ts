type paginationOptions = {
  limit?: number;
  sort?: "ASC" | "DESC";
  page?: number;
  sortBy?: string;
  orderType?: "priority" | "position";
  search?: string;
};

type exportedPaginationOptions = Required<paginationOptions>;

export const requestPagination = function (
  paginationOptions: paginationOptions
) {
  const maxLimit = 20;
  let limit = Number(paginationOptions.limit) || maxLimit;
  limit = limit > maxLimit ? maxLimit : limit;
  let sort = paginationOptions.sort || "ASC";
  const page = Number(paginationOptions.page) || 1;
  let sortBy = paginationOptions.sortBy || "id";
  const orderType = paginationOptions.orderType || "position";
  if (sortBy === "order" && orderType === "priority") {
    sort = sort === "DESC" ? "ASC" : "DESC";
  }
  let search = paginationOptions.search || "";
  return {
    limit,
    sort,
    page,
    sortBy,
    orderType,
    search,
  } as exportedPaginationOptions;
};
