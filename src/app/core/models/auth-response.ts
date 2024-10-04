export interface AuthResponse {
  name: string,
  roles: string[]
  tokenType: string,
  accessToken: string,
  accessTokenExpiry: string,
}