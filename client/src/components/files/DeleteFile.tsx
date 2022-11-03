import { SelectedFiles } from '@components/files/FileTable';
import Modal from '@components/modal';
import useModal from '@lib/hooks/useModal';
import { useEffect } from 'react';

interface Props {
  files: SelectedFiles[];
  onDelete: () => void;
  cancel: () => void;
}

const DeleteFile = ({ files, onDelete, cancel }: Props) => {
  const { isModalOpen, setIsModalOpen } = useModal();

  useEffect(() => {
    setIsModalOpen(true);
  }, []);
  return (
    <Modal
      hasFooter={false}
      styles={{ content: { height: 'auto', width: 'auto' } }}
      isOpen={isModalOpen}
      title={''}
      cancel={() => {
        setIsModalOpen(false);
        cancel();
      }}
      confirm={onDelete}
      confirmText="Upload"
    >
      <div className="flex h-full w-full">
        <div className="relative w-full max-w-md h-full md:h-auto">
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <i className="bx bx-error-circle text-6xl opacity-60"></i>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete {files.length > 1 ? 'these' : 'this'} files?
            </h3>
            <div className="flex flex-row items-center justify-between">
              <button
                onClick={onDelete}
                data-modal-toggle="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Yes, I'm sure
              </button>
              <button
                onClick={cancel}
                data-modal-toggle="popup-modal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-300 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteFile;
