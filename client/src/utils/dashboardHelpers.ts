import { formatBytes } from '@utils/index';
import { MediaFile } from '@lib/stores/file';
import { FileTypesCounts, StorageUsedData } from '@pages/Dashboard';

const maxStorage = 1000000000; // 1GB

export const calculateStorageUsed = (files: MediaFile[]): StorageUsedData => {
  const totalFilesSize = files.reduce((acc, file) => acc + file.size, 0);
  const storageUsedPercentage = (totalFilesSize / maxStorage) * 100;
  const storageUsedSize = formatBytes(totalFilesSize);
  return { storageUsedSize, storageUsedPercentage };
};

export const getFileTypesCounts = (files: MediaFile[]) => {
  const fileTypes: FileTypesCounts = {
    images: 0,
    videos: 0,
    documents: 0,
    audios: 0,
  };
  files.forEach((file) => {
    if (file.type.includes('image')) {
      fileTypes.images++;
    } else if (file.type.includes('video')) {
      fileTypes.videos++;
    } else if (file.type.includes('audio')) {
      fileTypes.audios++;
    } else {
      fileTypes.documents++;
    }
  });
  return fileTypes;
};

export const calculateFileActivityInLastWeek = (files: MediaFile[]) => {
  const totalFiles = files.length;
  const totalFilesSize = files.reduce((acc, file) => acc + file.size, 0);

  let filesUploaded = 0;
  let storageUsed = 0;
  files.forEach((file) => {
    const fileDate = new Date(file.created_at);
    const currentDate = new Date();
    const differenceInDays = Math.floor((currentDate.getTime() - fileDate.getTime()) / (1000 * 3600 * 24));
    if (differenceInDays <= 7) {
      filesUploaded++;
      storageUsed += file.size;
    }
  });
  const filesUploadedChange = isNaN((filesUploaded / totalFiles) * 100) ? 0 : (filesUploaded / totalFiles) * 100;
  const storageUsedChange = isNaN((storageUsed / totalFilesSize) * 100) ? 0 : (storageUsed / totalFilesSize) * 100;
  return { filesUploadedChange, storageUsedChange };
};

export const getFilesUploadedChartData = (files: MediaFile[]) => {
  const filesUploadedChartData = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Files Uploaded',
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };
  files.forEach((file) => {
    const fileDate = new Date(file.created_at);
    const day = fileDate.getDay();
    filesUploadedChartData.datasets[0].data[day] += 1;
  });
  return filesUploadedChartData;
};
