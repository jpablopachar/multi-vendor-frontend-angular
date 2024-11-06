import { UserInfo } from '@app/models'
import { jwtDecode } from 'jwt-decode'

export const returnInfo = (token: string | null) => {
  if (!token) return null

  const decodeToken = jwtDecode(token) as UserInfo
  
  return decodeToken
}