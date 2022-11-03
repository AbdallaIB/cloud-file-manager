import { StorageUsedData } from '@pages/Dashboard';

const StorageUsedCard = ({ storageUsedPercentage, storageUsedSize }: StorageUsedData) => {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="flex flex-col justify-center items-start gap-2 px-5 py-5">
        <header className="flex flex-row justify-between items-center w-full border-b border-gray-200">
          <h2 className="text-lg font-semibold text-slate-800">Total Storage Used</h2>
          <i className="bx bx-hdd text-2xl"></i>
        </header>
        <div className="font-semibold text-slate-400 uppercase text-lg">{storageUsedPercentage} %</div>
        <div className="text-md font-semibold text-slate-800">{storageUsedSize} used / 1 GB available</div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: storageUsedPercentage }}></div>
        </div>
      </div>
    </div>
  );
};

export default StorageUsedCard;
