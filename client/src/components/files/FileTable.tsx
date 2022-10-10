import { MediaFile } from '@services/FileService';
import { timeSinceDate } from '@utils/date';

const FileGrid = ({ files }: { files: MediaFile[] }) => {
  const fileIcons = {
    folder: 'bx bx-folder text-2xl',
    video: 'bx bx-movie-play text-2xl',
    image: 'bx bx-image text-2xl',
    audio: 'bx bx-music text-2xl',
    document: 'bx bxs-file-doc text-2xl',
  };
  return (
    <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 mt-4">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="inset-y-0 left-0 bg-gray-100 px-4 py-2 text-left">
              <label className="sr-only" htmlFor="SelectAll">
                Select All
              </label>

              <input className="h-5 w-5 rounded border-gray-200" type="checkbox" id="SelectAll" />
            </th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              <div className="flex items-center gap-2">Type</div>
            </th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              <div className="flex items-center gap-2">Name</div>
            </th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              <div className="flex items-center gap-2">Size</div>
            </th>
            <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              <div className="flex items-center gap-2">Date</div>
            </th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {files.map((file) => {
            return (
              <tr key={file.id}>
                <td className="sticky inset-y-0 left-0 px-4 py-2">
                  <label className="sr-only" htmlFor="Row1">
                    Row {file.id}
                  </label>

                  <input className="h-5 w-5 rounded border-gray-200" type="checkbox" id="Row1" />
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {(file.type === 'image' || file.type === 'video') && (
                    <img
                      src={file.type === 'image' ? file.url : file.thumbnail}
                      className="w-7 h-7 object-cover rounded-lg"
                      alt=""
                    />
                  )}
                  {file.type !== 'image' && <i className={fileIcons[file.type] + ' opacity-75'}></i>}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{file.name}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{file.size}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{timeSinceDate(file.created_at)}</td>
                <td className="whitespace-nowrap px-4 py-2">
                  <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
                    View
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FileGrid;
