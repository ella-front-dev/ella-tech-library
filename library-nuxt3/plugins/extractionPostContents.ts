import { defineNuxtPlugin } from '#imports'
// import { useCommStore } from '@/store'
// import { Post, PostsItem } from '@/store/post/type'
// import { PostContentsType } from '@/components/box/post/PostContents.vue'

type Og = { [Property in string]: string }

export interface ExtractionPostContents {
  description: string
  thumbnail: string
}

export const replacePostContentsType = {
  VIDEO_CLASS: 'video',
  LINK_CLASS: 'link'
}

/**
 * document fragment 에서 string 추출
 */
const getStringByDocumentFragment = (fragment: Node) => {
  const container = document.createElement('div')
  container.appendChild(fragment)
  return container.innerHTML
}

/**
 * 스트링을 HTML 변환
 * @param string
 */
const createHtmlByString = (string: string) => {
  const template = document.createElement('template')
  template.innerHTML = string.trim()
  return template.content
}

/**
 * 오픈 그래프 데이터 추출
 * @param html
 * @param url
 */
const getOpenGraphs = (html: string, url: string) => {
  const dom = createHtmlByString(html)!
  const ogs = dom.querySelectorAll('meta[property^="og:"]')

  const returnBase: Og = {}
  ;(Array.from(ogs) as HTMLMetaElement[]).forEach(og => {
    const property = og.getAttribute('property')
    if (property) {
      returnBase[property.replace('og:', '')] = og.content
    }
  })

  // set: title
  if (!returnBase.title) {
    returnBase.title = dom.querySelector('title')?.innerText || ''
  }

  // set: description
  if (!returnBase.description) {
    returnBase.description = (dom.querySelector('meta[name="description"]') as HTMLMetaElement)?.content || ''
  }

  // set: url
  if (!returnBase.url) {
    returnBase.url = url
  }

  return returnBase
}

/**
 * 앵커 tag > 오픈 그래프 ui 변환
 * @param url
 * @param errException
 */
// const createOpenGraph = async (url: string, errException: boolean) => {
//   const commStore = useCommStore()
//   const template = (og: Og) => `
//     <a class="og-preview" href="${og.url}" target="_blank">
//       <sapn class="og-image"><span class="image" style="background-image: url('${og.image}')"></span></sapn>
//       <span class="og-contents">
//         <span class="og-url">${og.url}</span>
//         <span class="og-title">${og.title}</span>
//         <span class="og-description">${og.description}</span>
//       </span>
//     </a>
//   `
//   try {
//     const { data } = await commStore.fetchCrawling({ callUrl: url })
//     const og = getOpenGraphs(data, url)
//     return template(og)
//   } catch(err) {
//     return errException ? '' : Promise.reject(err)
//   }
// }

/**
 * 앵커 tag > 비디오 아이프레임 변환
 */
const createIframeVideo = (url: string) => `
    <div class="video-container ratio-16x9">
      <iframe class="video" type="text/html" src="${url}" frameborder="0"></iframe>
    </div>
`

/**
 * 공유를 위해 포스트 컨텐츠에서 description, image 추출
 * @param postContents
 */
// export const extractionPostContents = (postContents: Post['nttCn'] | PostsItem['nttCn']): ExtractionPostContents => {
//   const container = document.createElement('div')
//   container.innerHTML = postContents.trim()
//   const firstDescription = container.querySelector('p')?.innerText
//   const firstImgUrl = container.querySelector('img')?.getAttribute('src')

//   return {
//     description: firstDescription || '',
//     thumbnail: firstImgUrl || ''
//   }
// }


/**
 * 포스트 컨텐츠의 일반 링크와 비디오 링크를 각각 OpenGraph UI, VideoIframe 으로 변환
 * @param postContents 포스트 컨텐츠
 * @param viewType 뷰타입 (detail, list)
 * @param ogErrException
 */
// export const replacerPostContents = async (
//   postContents: Post['nttCn'] | PostsItem['nttCn'],
//   viewType: PostContentsType,
//   ogErrException = false
// ) => {
//   try {
//     const els = createHtmlByString(postContents)
//     const videos = els.querySelectorAll(`a.${replacePostContentsType.VIDEO_CLASS}`)
//     const anchors = els.querySelectorAll(`a:${replacePostContentsType.LINK_CLASS}`)

//     // replace anchor to open graph
//     for (const anchor of Array.from(anchors)) {
//       const href = anchor.getAttribute('href')
//       if (href) {
//         const og = await createOpenGraph(href, ogErrException)

//         if (og) {
//           anchor.parentNode?.insertBefore(createHtmlByString(og), anchor.nextSibling)
//           anchor.remove()
//         }
//       }
//     }

//     // replace anchor to video: only detail view
//     if (viewType === 'detail') {
//       for (const video of Array.from(videos)) {
//         const href = video.getAttribute('href')
//         if (href) {
//           const videoIframe = createIframeVideo(href)
//           video.parentNode?.insertBefore(createHtmlByString(videoIframe), video.nextSibling)
//           video.remove()
//         }
//       }
//     }

//     return getStringByDocumentFragment(els)
//   } catch (err) {
//     return Promise.reject(err)
//   }
// }

export default defineNuxtPlugin(() => {
  return {
    provide: {
    //   extractionPostContents:
    //     (postContents: Post['nttCn'] | PostsItem['nttCn']) =>
    //       extractionPostContents(postContents),
    //   replacerPostContents:
    //     (postContents: Post['nttCn'] | PostsItem['nttCn'], viewType: PostContentsType) =>
    //       replacerPostContents(postContents, viewType)
    }
  }
})
