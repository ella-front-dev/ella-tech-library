import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import env, { Envs } from '@/configs/env'

export type KakaoShareObjectType =
  | 'feed'
  | 'list'
  | 'location'
  | 'commerce'
  | 'text'
  | 'calendar'

export interface KakaoShareLink {
  mobileWebUrl: string
  webUrl: string
}

export interface KaKaoShareContent {
  title: string
  description: string
  imageUrl: string
  link: KakaoShareLink
}

export interface KakaoShareItem {
  item: string
  itemOp: string
}

export interface KakaoShareItemContent {
  profileText: string;
  profileImageUrl: string;
  titleImageUrl: string;
  titleImageText: string;
  titleImageCategory: string;
  items: KakaoShareItem[];
  sum: string;
  sumOp: string;
}

export interface KakaoShareSocial {
  likeCount: number
  commentCount: number
  sharedCount: number
}

export interface KakaoShareLink2 {
  mobileWebUrl: string
  webUrl: string
}

export interface KakaoShareButton {
  title: string
  link: KakaoShareLink2
}

export interface KakaoShareRootObject {
  objectType: KakaoShareObjectType
  content: KaKaoShareContent
  itemContent?: KakaoShareItemContent
  social?: KakaoShareSocial
  buttons?: KakaoShareButton[]
}

export const sendKakaoShare = (payload: KakaoShareRootObject) => {
  if (typeof window === 'undefined') throw new Error('send kakao share is required window')

  if (!window.Kakao.isInitialized()) {
    const config = useRuntimeConfig()
    window.Kakao.init(env[(config.public.MODE || 'development') as Envs].KAKAO_APP_KEY)
  }

  window.Kakao.Share.sendDefault(payload)
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      sendKakaoShare: (payload: KakaoShareRootObject) => sendKakaoShare(payload)
    }
  }
})
