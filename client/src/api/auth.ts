import { apiRequest } from '@api/index';
import { ILoginResponse, IUserResponse, LoginInput, SignUpInput } from '@api/types';

export const registerUser = async (values: SignUpInput) => {
  return apiRequest<SignUpInput, IUserResponse>('post', 'register', {}, values);
};

export const loginUser = async (values: LoginInput) => {
  return apiRequest<LoginInput, ILoginResponse>('post', 'login', {}, values);
};
