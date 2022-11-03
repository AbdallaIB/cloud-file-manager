import FileActivityCard from '@components/dashboard/FileActivityCard';
import FileTypesCard from '@components/dashboard/FileTypesCard';
import LineChart from '@components/dashboard/LineChart';
import StorageUsedCard from '@components/dashboard/StorageUsedCard';
import useFileStore from '@lib/stores/file';
import {
  calculateFileActivityInLastWeek,
  calculateStorageUsed,
  getFilesUploadedChartData,
  getFileTypesCounts,
} from '@utils/dashboardHelpers';
import { useEffect, useState } from 'react';

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
  const { mediaFiles } = useFileStore();
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

  useEffect(() => {
    const fileTypesCounts = getFileTypesCounts(mediaFiles);
    setFileTypesCounts(fileTypesCounts);
    const storageUsedData = calculateStorageUsed(mediaFiles);
    setStorageUsedData(storageUsedData);
    const fileActivityData = calculateFileActivityInLastWeek(mediaFiles);
    setFileActivityData(fileActivityData);
    return () => {};
  }, [mediaFiles]);

  const chartData1 = {
    labels: [
      '12-01-2020',
      '01-01-2021',
      '02-01-2021',
      '03-01-2021',
      '04-01-2021',
      '05-01-2021',
      '06-01-2021',
      '07-01-2021',
      '08-01-2021',
      '09-01-2021',
      '10-01-2021',
      '11-01-2021',
      '12-01-2021',
      '01-01-2022',
      '02-01-2022',
      '03-01-2022',
      '04-01-2022',
      '05-01-2022',
      '06-01-2022',
      '07-01-2022',
      '08-01-2022',
      '09-01-2022',
      '10-01-2022',
      '11-01-2022',
      '12-01-2022',
      '01-01-2023',
    ],
    datasets: [
      // Indigo line
      {
        data: [
          732, 610, 610, 504, 504, 504, 349, 349, 504, 342, 504, 610, 391, 192, 154, 273, 191, 191, 126, 263, 349, 252,
          423, 622, 470, 532,
        ],
        fill: true,
        backgroundColor: 'transparent',
        borderColor: 'red',
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: 'red',
        clip: 20,
      },
      // Gray line
      {
        data: [
          532, 532, 532, 404, 404, 314, 314, 314, 314, 314, 234, 314, 234, 234, 314, 314, 314, 388, 314, 202, 202, 202,
          202, 314, 720, 642,
        ],
        borderColor: 'red',
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: 'red',
        clip: 20,
      },
    ],
  };

  // cards:
  // 1) Total file size / arbitrary limit
  // 2) count of media files by type
  // 3) change in number of files in last 7 days - Last 7 days

  // chart:

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-4">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Dashboard</h1>
      <div className="grid grid-flow-col gap-4 w-full mt-8">
        <StorageUsedCard {...storageUsedData}></StorageUsedCard>
        <FileTypesCard {...fileTypesCounts}></FileTypesCard>
        <FileActivityCard {...fileActivityData}></FileActivityCard>
      </div>
      <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200 mt-6">
        <LineChart data={chartData} width={389} height={300} />
      </div>

      {/* <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Welcome Back, Barry!</h1> */}
    </div>
  );
};

export default Dashboard;
