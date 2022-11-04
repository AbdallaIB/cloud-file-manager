import { formatBytes } from '@utils/index';
import create from 'zustand';

export type MediaFile = {
  id: number;
  name: string;
  size: number;
  formattedSize: string;
  type: 'image' | 'video' | 'audio' | 'document';
  url: string;
  created_at: string;
};

type FileStore = {
  mediaFiles: MediaFile[];
  isFilesFetched: boolean;
  setIsFilesFetched: () => void;
  removeFiles: (files: number[]) => void;
  appendFiles: (files: MediaFile[]) => void;
};

const useFileStore = create<FileStore>((set, get) => ({
  mediaFiles: [],
  isFilesFetched: false,
  setIsFilesFetched: () => set({ isFilesFetched: true }),
  removeFiles: (files: number[]) => {
    set((store) => ({
      ...store,
      mediaFiles: store.mediaFiles.filter((file) => !(files.indexOf(file.id) > -1)),
    }));
  },
  appendFiles: (files: MediaFile[]) => {
    files = files.map((file) => {
      return {
        ...file,
        formattedSize: formatBytes(file.size),
      };
    });
    const getUniqueFiles = (files: MediaFile[]) => {
      return [...new Map(files.map((file) => [file['id'], file])).values()];
    };
    set((store) => ({
      ...store,
      mediaFiles: getUniqueFiles([...store.mediaFiles, ...files]),
    }));
  },
}));

export default useFileStore;
