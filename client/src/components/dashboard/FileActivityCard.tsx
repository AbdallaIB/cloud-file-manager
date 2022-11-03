import { FileActivityData } from '@pages/Dashboard';

const FileActivityCard = ({ filesUploadedChange, storageUsedChange }: FileActivityData) => {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="flex flex-col justify-center items-start gap-2 px-5 py-5 h-full">
        <header className="flex flex-row justify-between items-center w-full border-b border-gray-200">
          <h2 className="text-lg font-semibold text-slate-800">Last 7 Days</h2>
          <i className="bx bx-line-chart text-2xl"></i>
        </header>
        <div className="flex flex-row justify-around items-center w-full h-full">
          <div
            className={
              'text-md font-semibold text-3xl flex flex-col items-center justify-start ' +
              (filesUploadedChange === 0
                ? 'text-slate-800'
                : filesUploadedChange > 0
                ? 'text-green-500'
                : 'text-red-500')
            }
          >
            <div className="font-semibold text-slate-400 uppercase text-lg">Files Uploaded</div>
            <div className="flex flex-row items-center justify-center">
              <i
                className={
                  filesUploadedChange === 0
                    ? ''
                    : filesUploadedChange > 0
                    ? 'bx bx-up-arrow-alt'
                    : 'bx bx-down-arrow-alt'
                }
              ></i>
              {filesUploadedChange}%
            </div>
            {/* <i class="bx bx-down-arrow-alt"></i> */}
          </div>
          <div
            className={
              'text-md font-semibold text-3xl flex flex-col items-center justify-start ' +
              (storageUsedChange === 0 ? 'text-slate-800' : storageUsedChange > 0 ? 'text-green-500' : 'text-red-500')
            }
          >
            <div className="font-semibold text-slate-400 uppercase text-lg">Storage</div>
            <div className="flex flex-row items-center justify-center">
              <i
                className={
                  storageUsedChange === 0 ? '' : storageUsedChange > 0 ? 'bx bx-up-arrow-alt' : 'bx bx-down-arrow-alt'
                }
              ></i>
              {storageUsedChange}%
            </div>
            {/* <i class="bx bx-down-arrow-alt"></i> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileActivityCard;
