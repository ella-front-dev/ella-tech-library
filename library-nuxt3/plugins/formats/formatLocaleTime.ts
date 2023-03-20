import moment from 'moment/moment'

export type FormatLocaleTimeType = 'full' | 'days' | 'times'

export default (date: Date, format: FormatLocaleTimeType) => {
  const timezoneOffset = new Date(date).getTimezoneOffset() / 60
  const timezonePrefix = timezoneOffset < 0 ? '+' : '-'
  const localeTime = new Date(new Date(date).getTime() + (new Date(date).getTimezoneOffset() * 60 * 1000 * -1))

  switch (format) {
    case 'full':
      return `${moment(date).format('YYYY-MM-DD hh:mm')} (GMT${timezonePrefix}${timezoneOffset * -1})`
    case 'days':
      return moment(localeTime).format('YYYY-MM-DD')
    case 'times':
      return moment(localeTime).format('hh:mm')
  }
}
