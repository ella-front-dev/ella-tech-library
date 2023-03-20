import { ModalName } from '~~/components/modal/modals/modals.name'

/**
 * 전역 로딩 인디케이터 타입
 */
export type LoadingIndicator = boolean

/**
 * 레이아웃 스토어 스테이트 타입
 */
export interface LayoutState {
  loadingIndicatorGlobal: LoadingIndicator
  headerRect: DOMRect | null
  lastModalName: ModalName | null
}
