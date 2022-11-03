import { MediaFile } from '@lib/stores/file';

export interface FileResponse {
  message: string;
  data: MediaFile[];
}

export interface IUser {
  uId: string;
  username: string;
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface SignUpInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface GenericResponse {
  message: string;
}

export interface ILoginResponse {
  user: IUser;
  accessToken: string;
}

export interface IUserResponse {
  user: IUser;
  accessToken: string;
}
