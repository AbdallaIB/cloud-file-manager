import { MediaFile } from '@pages/Files/Files';

const FileGrid = ({ files }: { files: MediaFile[] }) => {
  const fileIcons = {
    folder: 'bx bx-folder',
    video: 'bx bx-movie-play',
    image: 'bx bx-image',
    audio: 'bx bx-music',
    document: 'bx bxs-file-doc',
  };
  return (
    <div className="grid grid-flow-col w-full gap-4 mt-4">
      {files.map((file) => {
        return (
          <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
            <div className="px-5 pt-5">
              <header className="flex justify-between items-start mb-2">
                {/* Icon */}
                <i className={fileIcons[file.type]}></i>
                {/* <img src={Icon} width="32" height="32" alt="Icon 01" /> */}
                {/* Menu button */}
                {/* <EditMenu className="relative inline-flex">
                  <li>
                    <Link className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" to="#0">
                      Option 1
                    </Link>
                  </li>
                  <li>
                    <Link className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" to="#0">
                      Option 2
                    </Link>
                  </li>
                  <li>
                    <Link className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3" to="#0">
                      Remove
                    </Link>
                  </li>
                </EditMenu> */}
              </header>
              <h2 className="text-lg font-semibold text-slate-800 mb-2">Acme Plus</h2>
              <div className="text-xs font-semibold text-slate-400 uppercase mb-1">Sales</div>
              <div className="flex items-start">
                <div className="text-3xl font-bold text-slate-800 mr-2">$24,780</div>
                <div className="text-sm font-semibold text-white px-1.5 bg-green-500 rounded-full">+49%</div>
              </div>
            </div>
            {/* Chart built with Chart.js 3 */}
            <div className="grow">
              {/* Change the height attribute to adjust the chart height */}
              {/* <LineChart data={chartData} width={389} height={128} /> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FileGrid;
