import { MediaFile } from '@lib/context/FileContext';

export interface FileResponse {
  message: string;
  data: MediaFile[];
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
}

export interface UserDetailsResponse {
  user: IUser;
}
