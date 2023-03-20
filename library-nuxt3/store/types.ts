/**
 * 모든 페이징을 사용하는 리스트의 마지막 페이지 여부
 */
export interface PagingExtend {
  refresh: boolean
  last: boolean
}

/**
 * 모든 페이징을 사용하는 리스트 기본 타입
 */
export interface BasePagingList<T, P> extends PagingExtend {
  items: T
  payload: P
}
