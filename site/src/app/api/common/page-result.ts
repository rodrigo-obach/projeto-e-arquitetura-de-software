export interface PagedResult<T> {
  data: T[]
  pagination: {
    total: number
    currentPage: number
    totalPages: number
    pageSize: number
  }
}
