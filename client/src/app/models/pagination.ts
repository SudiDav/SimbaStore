export interface MetaData {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
}

// This will allow us to create an instance of our class
// and easily pass in the parameters
export class PaginatedResponse<T> {
  items: T;
  metaData: MetaData;

  constructor(items: T, metaData: MetaData) {
    this.items = items;
    this.metaData = metaData;
  }
}
