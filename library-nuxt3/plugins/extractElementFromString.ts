import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { PostsItem } from '~/store/post/type'


type useType = 'count' | 'both'

export interface TipTapExtractImage {
  count: number
  url: string[]
}

/**
 * 포스트 등록시 이미지 추출
 * @param tagString
 * @param type
 */
export const extractElementFromString = (tagString: string, type: useType = 'both'): number | TipTapExtractImage => {
  const config = useRuntimeConfig()
  const result: TipTapExtractImage = { count: 0, url: [] }
  const container = document.createElement('div')
  container.innerHTML = tagString
  const imgTag = container.querySelectorAll('img')

  if(type === 'count') {
    return imgTag.length
  }

  result.count = imgTag.length

  for(let i = 0; i < imgTag.length; i++){
    const path = imgTag[i].getAttribute('src')
    if (path?.includes(config.public.IMAGE_URL)) result.url.push(path)
  }

  return result
}

/**
 * 포스트 등록 후 포스트 컨텐츠에서 첫번째 이미지 url 추출
 */
export const getImgUrlFromPostContents = (postContents: PostsItem['nttCn']): string => {
  const container = document.createElement('div')
  container.innerHTML = postContents
  const imgTag = container.querySelector('img')
  const ogImg = container.querySelector('.og-preview .og-image .image')

  // 1. 이미지 태그가 존재한다면 이미지 태그에서 이미지 추출
  if (imgTag && imgTag.getAttribute('src')) {
    return imgTag.getAttribute('src')!
  }

  // 2. og 커스텀 태그가 존재한다면 og 에서 이미지 추출
  if (ogImg) {
    const style = window.getComputedStyle(ogImg)
    return style.backgroundImage.slice(4, -1).replace(/"/g, '')
  }

  return ''
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      extractElementFromString: (tagString:string, type:useType) => extractElementFromString(tagString, type),
      getImgUrlFromPostContents: (postContents: string) => getImgUrlFromPostContents(postContents)
    }
  }
})
