import { IGeolocation, IPlaceTerms } from "types/GooglePlace"

const USER_ACCESS_TOKEN = 'USER_ACCESS_TOKEN'
const USER_REFRESH_TOKEN = 'USER_REFRESH_TOKEN'
const GEOLOCATION = "GEOLOCATION"
const ADDRESS_TERM = "ADDRESS_TERM"

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

export const getStoredGeolocation = async () => {
  const res = localStorage.getItem(GEOLOCATION)
  if(res){
    return JSON.parse(res)
  }
  return null
}

export const storeGelocation = (data:IGeolocation) => {
  const stringData = JSON.stringify(data)
  localStorage.setItem(GEOLOCATION, stringData)
}

export const storeAddressTerms =  (data:IPlaceTerms)=>{
  const stringData = JSON.stringify(data)
  localStorage.setItem(ADDRESS_TERM, stringData)
}

export const getStoredAddressTerms = async () =>{
  const res = localStorage.getItem(ADDRESS_TERM)
  if(res){
    return JSON.parse(res)
  }
  return null
}