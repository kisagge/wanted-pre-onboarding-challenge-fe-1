export interface LoginRequestType {
  email: string;
  password: string;
}

export interface LoginResponseType {
  message: string;
  token: string;
}
