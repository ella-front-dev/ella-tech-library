export const checkEmpty = (value: any): boolean => value === ''
  || value === null
  || value === undefined
  || (typeof value === 'object' && !Object.keys(value).length)