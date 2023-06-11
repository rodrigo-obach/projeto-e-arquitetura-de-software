export interface PagedResult<T> {
  data: T
  pagination: {
    total: number
    currentPage: number
    totalPages: number
    pageSize: number
  }
}

export function emptyPagedResult<T>(page: number, pageSize: number): PagedResult<T[]> {
  return {
    data: [],
    pagination: {
      total: 0,
      currentPage: page,
      totalPages: 0,
      pageSize
    }
  }
}

export function createPagedResult<T>(data: T[], total: number, page: number, pageSize: number): PagedResult<T[]> {
  if (!total) {
    return emptyPagedResult<T>(page, pageSize)
  }

  return {
    data,
    pagination: {
      total,
      currentPage: page,
      totalPages: Math.ceil(total / pageSize),
      pageSize
    }
  }
}
