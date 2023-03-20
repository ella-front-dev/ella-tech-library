import { defineNuxtPlugin } from '#imports'
import { LocaleCodeType } from '@/configs/i18n'
import formatGapTime from '@/plugins/formats/formatGapTime'
import formatLocaleTime, { FormatLocaleTimeType } from '@/plugins/formats/formatLocaleTime'
import formatThousandsSeparators from '@/plugins/formats/formatThousandsSeparators'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      getFormatGapTime: (date: Date, language: LocaleCodeType) => formatGapTime(date, language),
      getFormatLocaleTime: (date: Date, format: FormatLocaleTimeType) => formatLocaleTime(date, format),
      getFormatThousandsSeparators: (number: number) => formatThousandsSeparators(number)
    }
  }
})
