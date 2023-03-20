const checkSpecialCharacters = (text: string) => {
  const pattern = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/
  return pattern.test(text)
}

export default checkSpecialCharacters
