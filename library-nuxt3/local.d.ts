interface Popup {
  ref: Window
  type: string
}

interface Window {
  Kakao: any
  wcs: any
  popup?: Popup
}


declare module 'vue-virtual-scroller'


