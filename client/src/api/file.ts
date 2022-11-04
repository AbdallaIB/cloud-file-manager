import { apiRequest, getAuthHeaders } from '@api/index';
import { FileResponse } from '@api/types';

export const getFile = async (id: string) => {
  return await apiRequest<string, FileResponse>('get', 'file', { params: { id } }, undefined, getAuthHeaders());
};

export const getUserFiles = async () => {
  return await apiRequest<undefined, FileResponse>('get', 'file', {}, undefined, getAuthHeaders());
};

export const uploadFiles = async (file: FormData) => {
  return await apiRequest<FormData, FileResponse>('post', 'file', {}, file, {
    'content-type': 'multipart/form-data',
    ...getAuthHeaders(),
  });
};

export const deleteFile = async (files: { id: number; name: string }[]) => {
  return await apiRequest<{ files: { id: number; name: string }[] }, FileResponse>(
    'delete',
    'file',
    {},
    { files },
    getAuthHeaders(),
  );
};
