export interface AuthResponse {
  tokenType: string,
  accessToken: string,
  accessTokenExpiry: string,
  authName: string,
  username: string;
  roles: string[]
}