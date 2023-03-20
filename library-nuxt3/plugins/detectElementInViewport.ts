import { defineNuxtPlugin } from '#app'

export type direction = 'top'|'bottom'

/**
 * 
 * @param el : 선택한 엘리먼트
 * @param scrollContainer :  엘리먼트들이 있는 내부 스크롤 컨테이너 
 * @param direction : 해당 조건에 따라 값의 조건도 바뀐다.
 *    'top' : 선택한 엘리먼트의 top 위치가 스크롤컨테이너 top 위치보다 작아서 안보이는 경우
 *    'bottom' : 선택한 엘리먼트의 top 위치가 스크롤컨테이너 top 위치와 스크롤컨테이너 높이를 더한 값보다 커서 안보이는 경우
 *    기본은 'bottom'으로 설정되어있습니다.
 * @returns result : direction의 값에 따라 내부 변수인 result의 값이 정해진다.
 */
export const detectElementInViewport = (el: Element, scrollContainer: HTMLElement | null, direction:direction ='bottom') => {
  const rect = el.getBoundingClientRect()
  const scrollRect = scrollContainer?.getBoundingClientRect()
  let result = false
  if(direction === 'top'){
    result = rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom < scrollRect!.top &&
    rect.right < scrollRect!.right
  }else{
    result = rect.top >= 0 &&
    rect.left >= 0 &&
    // rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    // rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    rect.bottom <= scrollContainer!.clientHeight + scrollRect!.top &&
    rect.right <= scrollContainer!.clientWidth + scrollRect!.right
  }
  
  return (
    result
  )
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      detectElementInViewport: (el: Element, scrollContainer: HTMLElement, direction: direction) => detectElementInViewport(el,scrollContainer,direction)
    }
  }
})
