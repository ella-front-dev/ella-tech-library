import { LocaleObject } from 'vue-i18n-routing'
import {
  defineNuxtPlugin,
  addRouteMiddleware,
  useRequestEvent,
  createError,
  useAsyncData
} from '#imports'
import { api } from '@/api'
import { getCookie } from '@/plugins/cookieHelper'
import { useUserStore, useEtcStore, usePostStore } from '@/store'
import { AuthUserToken } from '@/store/user/type'
import mixinSignProcess from '@/mixins/useSignProcess'

export default defineNuxtPlugin(nuxtApp => {
  const userStore = useUserStore()
  const postStore = usePostStore()
  const etcStore = useEtcStore()
  const { fetchUserInfo } = mixinSignProcess()

  /**
   * locale-middleware
   * @description 언어 설정을 헤더에 주입
   */
  addRouteMiddleware('locale-middleware', () => {
    const locale = nuxtApp.$i18n.locale.value
    api.defaults.headers.common['Accept-Language'] = String(locale).toUpperCase()
  }, { global: true })

  /**
   * user-middleware
   * @description 새로고침 시에도 사용자 정보를 가지고 있을 수 있도록 설정
   */
  addRouteMiddleware('user-middleware', async () => {
    if (process.client && !userStore.isSignIn) {
      const clientCookie = getCookie('userInfo')
      const userInfo: AuthUserToken | null = clientCookie ? JSON.parse(clientCookie) : null


      if (userInfo) {
        await fetchUserInfo({ userCmmnSn : userInfo.userCmmnSn })
      }
    }
  },{ global: true })

  /**
   * jwt-middleware
   * @description 서버사이드에서 개인화된 정보를 조회하기 위해 API Request Header에 서버 리퀘스트 헤더의 토큰을 찾아 주입
   */
  addRouteMiddleware('jwt-middleware', () => {
    if (process.server) {
      const requestEvent = useRequestEvent()
      const cookie = requestEvent.node.req.headers.cookie
        ? getCookie('authToken', requestEvent.node.req.headers.cookie)
        : null
      const authToken = cookie ? JSON.parse(cookie) : null

      if (authToken) {
        api.defaults.headers.common.Authorization = `${authToken.grantType} ${authToken.accessToken}`
      } else {
        delete api.defaults.headers.common.Authorization
      }
    }
  }, { global: true })

  /**
   * route-guard
   * @description 로그인 하지 않은 사용자가 로그인이 필요한 페이지 접근시 에러페이지 노출
   */
  addRouteMiddleware('route-guard', (to) => {
    const limitRoutesPrefix = ['mypage']
    const locales: LocaleObject[] = nuxtApp.$i18n.locales.value
    const limitRouteNames: string[] = []
    let passTo = false

    // set limitRouteNames
    limitRoutesPrefix.forEach(prefix => {
      locales.forEach(locale => {
        limitRouteNames.push(`${prefix}___${locale.code}`)
      })
    })

    if (limitRouteNames.includes(String(to.name))) {
      // server side
      if (process.server) {
        const requestEvent = useRequestEvent()
        const cookie = requestEvent.node.req.headers.cookie
          ? getCookie('authToken', requestEvent.node.req.headers.cookie)
          : null
        const authToken = cookie ? JSON.parse(cookie) : null
        passTo = !!authToken
      }

      // client side
      else {
        passTo = userStore.isSignIn
      }

      if (!passTo) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
      }
    }
  }, { global: true })

  /**
   * required-fetch
   * @description 앱구동에 필요한 필수 api를 호출
   */
  addRouteMiddleware('required-fetch', async (to, from) => {
    const requiredApis = []
    const isFirstLanding = to.fullPath === from.fullPath
    const isLocaleChanged = (() => {
      const getLocale = (name: string) => name.split('___').pop()
      return getLocale(String(to.name)) !== getLocale(String(from.name))
    })()

    // 사용자에게 새로운 알림이 있는지 조회
    if (userStore.isSignIn)
      requiredApis.push(useAsyncData('newAlarmCount', () => etcStore.fetchNewAlarmCount()))

    // 알림 설정 리스트 조회 (etag 사용하지 않지만 언어 변경시 조회)
    if (userStore.isSignIn && (isFirstLanding || isLocaleChanged || !etcStore.alarms.length))
      requiredApis.push(useAsyncData('alarms', () => etcStore.fetchAlarms()))

    // 카테고리 목록 조회 (etag 사용함)
    if (isFirstLanding || isLocaleChanged || !postStore.categories.length)
      requiredApis.push(useAsyncData('categories', () => postStore.fetchCategories(false)))

    // 어드민 관리 해시태그 목록 조회 (etag 사용함)
    if (isFirstLanding || isLocaleChanged || !postStore.baseHashtags.length)
      requiredApis.push(useAsyncData('baseHashtags', () => postStore.fetchBaseHashtags()))

    // 정책 목록 조회 (etag 사용하지 않지만 언어 변경시 조회)
    if (isFirstLanding || isLocaleChanged || !etcStore.terms.length)
      requiredApis.push(useAsyncData('terms', () => etcStore.fetchTerms()))

    // 문의 분류 리스트 조회 (etag 사용하지 않지만 언어 변경시 조회)
    if (isFirstLanding || isLocaleChanged || !etcStore.classifications.length)
      requiredApis.push(useAsyncData('classifications', () => etcStore.fetchClassifications()))

    // 신고 코드 리스트 조회 (etag 사용하지 않지만 언어 변경시 조회)
    if (isFirstLanding || isLocaleChanged || !etcStore.reportCodes.length)
      requiredApis.push(useAsyncData('reportCodes', () => etcStore.fetchReportCodes()))

    try {
      await Promise.all(requiredApis)
    } catch {
      throw createError({ statusCode: 500, statusMessage: 'Required api request fail' })
    }
  }, { global: true })
})
