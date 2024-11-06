import { jwtDecode } from 'jwt-decode'

export const returnInfo = (token: string | null) => {
  if (!token) return ''

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const decodeToken = jwtDecode(token) as any
  
  return decodeToken
}