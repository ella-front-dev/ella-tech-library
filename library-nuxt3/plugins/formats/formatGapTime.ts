import ko from '@/locales/ko'
import en from '@/locales/en'
import { LocaleCodeType } from '@/configs/i18n'
import formatLocaleTime from '~/plugins/formats/formatLocaleTime'

export default (date: Date, language: LocaleCodeType) => {
  const pastTimestamp = new Date(new Date(date).getTime() + (new Date(date).getTimezoneOffset() * 60 * 1000 * -1)).getTime()
  const createUnit = (unit: 'under-hour' | 'under-day' | 'under-week') => {
    const languages = { ko, en }
    const langData = languages[language]

    switch (unit) {
      case 'under-hour':
        return langData.gapTime.underHour
      case 'under-day':
        return langData.gapTime.underDay
      case 'under-week':
        return langData.gapTime.underWeek
      default:
        return ''
    }
  }

  if (pastTimestamp) {
    const nowTimestamp = new Date().getTime()
    const timestampGap = nowTimestamp - pastTimestamp
    const intervalCalc = (interval: number, unit: string) => `${Math.floor(timestampGap / interval)}${unit}`

    // 1시간 이내: 방금전
    if (timestampGap < 1000 * 60 * 60) {
      return createUnit('under-hour')
    }

    // 1일 이내: {hours} 시간전
    if (timestampGap < 1000 * 60 * 60 * 24) {
      return intervalCalc(1000 * 60 * 60, createUnit('under-day'))
    }

    // 1주일 이내: {days} 일전
    if (timestampGap < 1000 * 60 * 60 * 24 * 7) {
      return intervalCalc(1000 * 60 * 60 * 24, createUnit('under-week'))
    }

    // 그외: YYYY-MM-DD hh:mm (GMT+{TimezoneOffsetHours})
    return formatLocaleTime(date, 'full')
  }
}
