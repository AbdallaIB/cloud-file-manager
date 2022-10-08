import FileGrid from '@components/files/grid';

export interface MediaFile {
  id: string;
  name: string;
  type: 'video' | 'image' | 'audio' | 'document';
  size: string;
  createdAt: string;
}

interface Props {}

const Files = (props: Props) => {
  const files: MediaFile[] = [
    {
      id: '1',
      name: 'video.mp4',
      type: 'video',
      size: '380.5 MB',
      createdAt: '2021-01-01',
    },
    {
      id: '2',
      name: 'image.jpg',
      type: 'image',
      size: '1.5 MB',
      createdAt: '2021-01-01',
    },
    {
      id: '3',
      name: 'audio.mp3',
      type: 'audio',
      size: '380.5 MB',
      createdAt: '2021-01-01',
    },
    {
      id: '4',
      name: 'document.pdf',
      type: 'document',
      size: '380.5 MB',
      createdAt: '2021-01-01',
    },
  ];
  return (
    <div className="flex flex-col px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Files</h1>
      <div className="flex flex-row w-full justify-between mt-4">
        <div className="flex flex-row gap-3">
          <button
            type="button"
            className="gap-1 justify-center flex-row text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <i className="bx bx-upload text-xl"></i>
            Upload
          </button>
          <button
            type="button"
            className="flex gap-1 justify-center items-center flex-row shrink-0 rounded-md bg-white px-3 text-gray-600 shadow-sm hover:text-gray-700"
          >
            <i className="bx bx-plus text-2xl text-gray-600"></i>
            New Folder
          </button>
        </div>
        <div className="flex flex-row gap-3">
          <button
            type="button"
            className="block shrink-0 rounded bg-white p-1 text-gray-600 shadow-sm hover:text-gray-700"
          >
            <i className="bx bx-filter text-xl text-gray-600"></i>
          </button>
        </div>
      </div>
      <FileGrid files={files}></FileGrid>
    </div>
  );
};

export default Files;
