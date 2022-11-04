import { FileTypesCounts } from '@pages/Dashboard';

interface FileIcons {
  [key: string]: string | undefined;
}

const FileTypesCard = (fileTypesCounts: FileTypesCounts) => {
  const fileIcons: FileIcons = {
    videos: 'bx bx-movie-play text-2xl',
    images: 'bx bx-image text-2xl',
    audios: 'bx bx-music text-2xl',
    documents: 'bx bxs-file-doc text-2xl',
  };

  const capitalise = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="flex flex-col justify-center items-start gap-2 px-3 py-5">
        <header className="flex flex-row justify-between items-center w-full border-b border-gray-200">
          <h2 className="text-lg font-semibold text-slate-800">File Types</h2>
          <i className="bx bx-list-ul text-3xl"></i>
        </header>
        <div className="flex flex-row items-center justify-center gap-4 w-full">
          {Object.entries(fileTypesCounts).map(([key, value], index) => (
            <div key={index} className="flex flex-col items-center justify-center gap-2">
              <p className="font-medium">{capitalise(key)}</p>
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
