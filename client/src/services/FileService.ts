import Axios, { AxiosRequestHeaders } from 'axios';

export async function apiRequest<D = Record<string, unknown>, R = unknown>(
  method: 'get' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch',
  path: string,
  params?: any,
  input?: D,
  options?: AxiosRequestHeaders,
) {
  const res = await Axios.request<R>({
    url: `${process.env.BASE_API_URL}/${path}`,
    method: method,
    data: input,
    params: params,
    headers: options,
  });
  return res.data;
}

export interface FileResponse {
  message: string;
  data: MediaFile[];
}

export interface MediaFile {
  id: string;
  name: string;
  size: string;
  type: 'image' | 'video' | 'audio' | 'document';
  url: string;
  created_at: string;
}
export interface LoginInput {
  email: string;
  password: string;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
}

export interface UserDetailsResponse {
  user: User;
}

export const getFile = async (id: string) => {
  try {
    return await apiRequest<string, MediaFile[]>('get', 'file', { params: { id } });
  } catch (error) {
    return [];
  }
};

export const getUserFiles = async () => {
  return await apiRequest<undefined, FileResponse>('get', 'file', {}, undefined, {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJrZWxseXMiLCJpYXQiOjE2NjUzNTA5OTksImV4cCI6MTY2NTk1NTc5OX0.jYIgeAHLMC5IwBqzt-DCNcTJ0zEHbhW4HiutFhJPli4',
  });
};

export const uploadFile = async (file: MediaFile) => {
  try {
    return await apiRequest<MediaFile, MediaFile[]>('post', 'file', {}, file);
  } catch (error) {
    return [];
  }
};

export const deleteFile = async (id: string) => {
  try {
    return await apiRequest<string, MediaFile[]>('delete', 'file', { params: { id } });
  } catch (error) {
    return [];
  }
};
