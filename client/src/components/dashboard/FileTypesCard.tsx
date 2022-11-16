import { FileTypesCounts } from '@pages/Dashboard';

interface FileIcons {
  [key: string]: string | undefined;
}

export const fileIcons: FileIcons = {
  videos: 'bx bx-movie-play text-2xl',
  images: 'bx bx-image text-2xl',
  audios: 'bx bx-music text-2xl',
  documents: 'bx bxs-file-doc text-2xl',
};

const FileTypesCard = (fileTypesCounts: FileTypesCounts) => {
  const capitalize = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 border-solid dark:border-gray-700 shadow-lg rounded-sm border dark:border-0 border-slate-200">
      <div className="flex flex-col justify-center items-start gap-2 px-3 py-5">
        <div className="flex flex-row justify-between items-center w-full border-b border-gray-200">
          <h2 className="text-lg font-semibold">File Types</h2>
          <i className="bx bx-list-ul text-3xl"></i>
        </div>
        <div className="flex flex-row items-center justify-center gap-4 w-full">
          {Object.entries(fileTypesCounts).map(([key, value], index) => (
            <div key={index} className="flex flex-col items-center justify-center gap-2">
              <p className="font-medium">{capitalize(key)}</p>
              <i className={fileIcons[key]}></i>
              <p className="font-semibold">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileTypesCard;
