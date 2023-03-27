import { defineNuxtPlugin } from '#imports'
import formatGapTime from '@/plugins/formats/formatGapTime'
import formatLocaleTime, { FormatLocaleTimeType } from '@/plugins/formats/formatLocaleTime'
import formatThousandsSeparators from '@/plugins/formats/formatThousandsSeparators'
export type LocaleCodeType = 'ko' | 'en'


export default defineNuxtPlugin(() => {
  return {
    provide: {
      getFormatGapTime: (date: Date, language: LocaleCodeType) => formatGapTime(date, language),
      getFormatLocaleTime: (date: Date, format: FormatLocaleTimeType) => formatLocaleTime(date, format),
      getFormatThousandsSeparators: (number: number) => formatThousandsSeparators(number)
    }
  }
})
