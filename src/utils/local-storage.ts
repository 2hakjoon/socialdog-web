const USER_ACCESS_TOKEN = 'USER_ACCESS_TOKEN'
const USER_REFRESH_TOKEN = 'USER_REFRESH_TOKEN'

export const setAccessToken = (accessToken:string) => {
  localStorage.setItem(USER_ACCESS_TOKEN, accessToken)
}

export const getAccessToken = () => {
  return localStorage.getItem(USER_ACCESS_TOKEN)
}

export const setRefreshToken = (refreshToken:string) => {
  localStorage.setItem(USER_REFRESH_TOKEN, refreshToken)
}

export const getRefreshToken = () => {
  return localStorage.getItem(USER_REFRESH_TOKEN)
}

export const removeAllTokens = () => {
  localStorage.removeItem(USER_ACCESS_TOKEN)
  localStorage.removeItem(USER_REFRESH_TOKEN)
}