import { deleteFile } from '@api/file';
import DeleteFile from '@components/files/DeleteFile';
import FileViewer from '@components/files/FileViewer';
import Modal from '@components/modal';
import useModal from '@lib/hooks/useModal';
import useToast from '@lib/hooks/useToast';
import useFileStore, { MediaFile } from '@lib/stores/file';
import { timeSinceDate } from '@utils/date';
import { useEffect, useState } from 'react';

export interface SelectedFiles {
  id: number;
  name: string;
  checked: boolean;
}

const FileTable = ({
  showDeleteConfirmation,
  setShowDeleteConfirmation,
  checkedFiles,
}: {
  showDeleteConfirmation: boolean;
  setShowDeleteConfirmation: (value: boolean) => void;
  checkedFiles: (selectedFiles: SelectedFiles[]) => void;
}) => {
  const { mediaFiles, removeFiles } = useFileStore();
  const { isModalOpen, setIsModalOpen } = useModal();
  const { errorMessage, promise } = useToast();
  const [selectedFiles, setSelectedFiles] = useState<SelectedFiles[] | []>([]);
  const [openFile, setOpenFile] = useState<MediaFile | null>(null);
  const fileIcons = {
    video: 'bx bx-movie-play text-2xl',
    image: 'bx bx-image text-2xl',
    audio: 'bx bx-music text-2xl',
    document: 'bx bxs-file-doc text-2xl',
  };

  useEffect(() => {
    const newFiles = mediaFiles.map((file) => {
      return { id: file.id, checked: false, name: file.name };
    });
    setSelectedFiles(newFiles);
    console.log(selectedFiles);
  }, []);

  const getFileHeader = (file: MediaFile): string => {
    return file.name + ' - ' + timeSinceDate(file.created_at) + ' - ' + file.size;
  };

  const toggleAllSelectedFiles = () => {
    const newFiles = selectedFiles.map((file: SelectedFiles) => {
      return { ...file, checked: !file.checked };
    });
    setSelectedFiles(newFiles);
    checkedFiles(newFiles.filter((file) => file.checked));
  };

  const deleteSelectedFiles = async () => {
    // get selected files name and id and pass it to delete file
    const filesToDelete = selectedFiles
      .filter((file) => file.checked)
      .map((file) => {
        return { id: file.id, name: file.name };
      });

    try {
      await promise(deleteFile(filesToDelete), {
        loading: 'Deleting files...',
        success: 'Files deleted!',
        error: 'Failed to delete files',
      });
      setShowDeleteConfirmation(false);
      // remove selected files from media files
      removeFiles(filesToDelete.map((file) => file.id));
    } catch (err) {
      errorMessage(err);
    }
  };

  return (
    <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 mt-4">
      {mediaFiles && mediaFiles.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="inset-y-0 left-0 bg-gray-100 px-4 py-2 text-left">
                <label className="sr-only" htmlFor="SelectAll">
                  Select All
                </label>

                <input
                  className="h-5 w-5 rounded border-gray-200"
                  type="checkbox"
                  id="SelectAll"
                  onChange={toggleAllSelectedFiles}
                />
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

          <tbody className="divide-y divide-gray-200 ">
            <>
              {mediaFiles.map((file: MediaFile, index: number) => {
                return (
                  <tr key={index}>
                    <td className="sticky inset-y-0 left-0 px-4 py-2">
                      <label className="sr-only" htmlFor={file.id + 'file'}>
                        Row {file.id}
                      </label>

                      {selectedFiles[index] && (
                        <input
                          className="h-5 w-5 rounded border-gray-200"
                          type="checkbox"
                          id={file.id + 'file'}
                          name={file.name}
                          checked={selectedFiles[index].checked}
                          onChange={() => {
                            const newSelectedFiles = selectedFiles.map((oldFile) => {
                              if (oldFile.id === file.id) {
                                return { ...oldFile, checked: !oldFile.checked };
                              }
                              return oldFile;
                            });
                            setSelectedFiles(newSelectedFiles);
                            checkedFiles(newSelectedFiles.filter((file) => file.checked));
                          }}
                        />
                      )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {file.type === 'image' && (
                        <img src={file.url} className="w-7 h-7 object-cover rounded-lg" alt="" />
                      )}
                      {file.type !== 'image' && <i className={fileIcons[file.type] + ' opacity-75'}></i>}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{file.name}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{file.formattedSize}</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{timeSinceDate(file.created_at)}</td>
                    <td className="whitespace-nowrap px-4 py-2">
                      <button
                        onClick={() => {
                          setOpenFile(file);
                          setIsModalOpen(true);
                        }}
                        className="text-sm font-medium text-blue-600 hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </>
          </tbody>
        </table>
      ) : (
        <div className="flex w-full items-center justify-center" style={{ height: '60vh' }}>
          <p className="font-normal text-xl">No files found!</p>
        </div>
      )}
      <Modal
        hasFooter={false}
        styles={{ content: { width: '70vw', height: '80vh' } }}
        isOpen={isModalOpen}
        title={openFile ? getFileHeader(openFile) : ''}
        cancel={() => {
          setIsModalOpen(false);
          setOpenFile(null);
        }}
        confirm={() => {}}
        confirmText="Upload"
      >
        {openFile && <FileViewer file={openFile} />}
      </Modal>
      {showDeleteConfirmation && (
        <DeleteFile
          files={selectedFiles}
          onDelete={deleteSelectedFiles}
          cancel={() => setShowDeleteConfirmation(false)}
        ></DeleteFile>
      )}
    </div>
  );
};

export default FileTable;
