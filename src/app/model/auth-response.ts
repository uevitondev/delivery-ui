export interface AuthResponse {
  tokenType: string,
  accessToken: string,
  accessTokenExpiry: string,
  userName: string,
  authorities: string
}