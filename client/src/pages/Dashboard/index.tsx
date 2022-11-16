import { getUserFiles } from '@api/file';
import FileActivityCard from '@components/dashboard/FileActivityCard';
import FileTypesCard from '@components/dashboard/FileTypesCard';
import StorageUsedCard from '@components/dashboard/StorageUsedCard';
import useToast from '@lib/hooks/useToast';
import useFileStore from '@lib/stores/file';
import {
  calculateFileActivityInLastWeek,
  calculateStorageUsed,
  getFilesUploadedChartData,
  getFileTypesCounts,
} from '@utils/dashboardHelpers';
import { useEffect, useState } from 'react';
import FilesUploadedChart from '@components/dashboard/FilesUploadedChart';

export type FileTypesCounts = {
  images: number;
  videos: number;
  audios: number;
  documents: number;
};

export type StorageUsedData = {
  storageUsedPercentage: number;
  storageUsedSize: string;
};

export type FileActivityData = {
  filesUploadedChange: number;
  storageUsedChange: number;
};

const Dashboard = () => {
  const { appendFiles, setIsFilesFetched, isFilesFetched, mediaFiles } = useFileStore();
  const { errorMessage } = useToast();
  const chartData = getFilesUploadedChartData(mediaFiles);
  const [fileTypesCounts, setFileTypesCounts] = useState<FileTypesCounts>({
    images: 0,
    videos: 0,
    audios: 0,
    documents: 0,
  });
  const [storageUsedData, setStorageUsedData] = useState<StorageUsedData>({
    storageUsedPercentage: 0,
    storageUsedSize: '0 MB',
  });
  const [fileActivityData, setFileActivityData] = useState<FileActivityData>({
    filesUploadedChange: 0,
    storageUsedChange: 0,
  });

  const fetchData = async () => {
    try {
      const res = await getUserFiles();
      appendFiles(res.data);
      setIsFilesFetched();
    } catch (err) {
      errorMessage(err);
    }
  };

  useEffect(() => {
    const fileTypesCounts = getFileTypesCounts(mediaFiles);
    setFileTypesCounts(fileTypesCounts);
    const storageUsedData = calculateStorageUsed(mediaFiles);
    setStorageUsedData(storageUsedData);
    const fileActivityData = calculateFileActivityInLastWeek(mediaFiles);
    setFileActivityData(fileActivityData);
    return () => {};
  }, [mediaFiles]);

  useEffect(() => {
    if (!isFilesFetched) fetchData();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-4">
      <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-200 sm:text-3xl">Dashboard</h1>
      <div className="grid grid-flow-col gap-4 w-full mt-6">
        <StorageUsedCard {...storageUsedData}></StorageUsedCard>
        <FileTypesCard {...fileTypesCounts}></FileTypesCard>
        <FileActivityCard {...fileActivityData}></FileActivityCard>
      </div>
      <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border dark:border-0 border-slate-200 mt-6">
        <FilesUploadedChart data={chartData} />
      </div>
    </div>
  );
};

export default Dashboard;
