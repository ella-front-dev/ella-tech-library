import { PropType } from 'vue'

/**
 * @description 리사이클러 뷰 외부에서 주입받은 데이터를 리사이클러 뷰 내부에서 사용하는 데이터로 맵핑
 */
export interface RecyclerViewItem {
  data: Object
  height: number
  top: number
  tomb: boolean
  loaded: boolean
}

export interface RecyclerViewProps {
  list: Array<any>
  skeleton: boolean
  size: number
  offset: number,
  loadMore: Function
  spinner: boolean
  noMore: boolean
  isEmpty: boolean
  isRefreshing: boolean
  listTopPadding: number
  carListType: boolean
}

export const recyclerViewProps = {
  list: {
    type: Array as PropType<any>,
    required: true
  },
  skeleton: {
    type: Boolean,
    default: false // Whether to show skeletons.
  },
  size: {
    type: Number,
    default: 10 // The number of items added each time.
  },
  offset: {
    type: Number,
    default: 200 // The number of pixels of additional length to allow scrolling to.
  },
  loadMore: {
    required: true, // The function of loading more items.
    type: Function
  },
  spinner: {
    type: Boolean,
    default: true // Whether to show loading spinner.
  },
  isEmpty: {
    type: Boolean,
    default: false
  },
  isRefreshing: {
    type: Boolean,
    default: false
  },
  listTopPadding: {
    type: Number,
    default: 0
  }
}
