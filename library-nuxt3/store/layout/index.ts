import { defineStore } from 'pinia'
import * as LayoutType from '@/store/layout/type'
import { ModalName } from '~~/components/modal/modals/modals.name'

const initLayoutState: LayoutType.LayoutState = {
  loadingIndicatorGlobal: false,
  headerRect: null,
  lastModalName: null
}

export const useLayoutStore = defineStore('layout', {
  state: (): LayoutType.LayoutState => initLayoutState,
  getters: {},
  actions: {
    /**
     * 전역 로딩 인디케이터 업데이트
     */
    updateLoadingIndicatorGlobal(payload: LayoutType.LoadingIndicator) {
      this.loadingIndicatorGlobal = payload
    },

    /**
     * 헤더 rect 업데이트
     */
    updateHeaderRect(payload: DOMRect | null) {
      this.headerRect = payload
    },

    /**
     * 마지막 열었던 팝업
     */
    updateLastModalName(payload: ModalName) {
      this.lastModalName = payload
    }
  }
})
