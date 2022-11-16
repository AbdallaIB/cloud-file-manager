import { getUserFiles, uploadFiles } from '@api/file';
import Dropzone from '@components/files/Dropzone';
import FileTable from '@components/files/FileTable';
import FileGrid from '@components/files/FileGrid';
import Modal from '@components/modal';
import Button from '@components/shared/Button';
import IconButton from '@components/shared/IconButton';
import useModal from '@lib/hooks/useModal';
import useToast from '@lib/hooks/useToast';
import useFileStore from '@lib/stores/file';
import { useCallback, useEffect, useState } from 'react';
import { getMediaType } from '@utils/index';

export interface UploadedFile {
  id: string;
  name: string;
  src: string | ArrayBuffer;
  size: number;
  file: File;
  type: 'image' | 'video' | 'audio' | 'document';
}

const tenMegaBytesInBytes = 10485760;

const Files = () => {
  const { isModalOpen, setIsModalOpen } = useModal();
  const { errorMessage, promise, error } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const { appendFiles, setIsFilesFetched, isFilesFetched } = useFileStore();

  const fetchData = async () => {
    try {
      const res = await getUserFiles();
      appendFiles(res.data);
      setIsFilesFetched();
    } catch (err) {
      errorMessage(err);
    }
  };

  useEffect(() => {
    if (!isFilesFetched) fetchData();
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file: File) => {
      const reader = new FileReader();
      reader.onload = async function (e) {
        if (!e.target || !e.target.result) return;
        const result = e.target.result;
        if (file.size > tenMegaBytesInBytes) {
          error('File size cannot be greater than 10MB.');
          console.log('File size cannot be greater than 10MB.');
          return;
        }
        setUploadedFiles((prevState: UploadedFile[]) => [
          ...prevState,
          {
            id: Math.random().toString(),
            src: result,
            name: file.name,
            size: file.size,
            file,
            type: getMediaType('.' + file.type.split('/')[1]),
          },
        ]);
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  const uploadFile = async () => {
    const formData = new FormData();
    uploadedFiles.forEach((file) => {
      formData.append('uploadedFiles', file.file);
    });
    try {
      const uploadPromise = uploadFiles(formData);
      promise(uploadPromise, {
        loading: 'Uploading files...',
        success: 'Files uploaded!',
        error: 'Failed to upload files',
      });
      const res = await uploadPromise;
      setUploadedFiles([]);
      appendFiles(res.data);
      setIsModalOpen(false);
      console.log(res);
    } catch (err) {
      errorMessage(err);
    }
  };

  return (
    <div className="flex flex-col px-4 sm:px-6 lg:px-8 mt-12">
      <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-200 sm:text-3xl">Files</h1>
      <div className="flex flex-row w-full justify-between mt-6">
        <div className="flex flex-row gap-3">
          <Button text="Upload" iconClass="bx bx-upload" onClick={() => setIsModalOpen(true)} isPrimary={true}></Button>
        </div>
        <div className="flex flex-row gap-3 bg-red">
          {showDeleteButton && (
            <IconButton onClick={() => setShowDeleteConfirmation(true)} iconClass="bx bx-trash text-xl"></IconButton>
          )}
          <IconButton iconClass="bx bx-filter"></IconButton>
        </div>
      </div>
      <FileTable
        showDeleteConfirmation={showDeleteConfirmation}
        setShowDeleteConfirmation={(value) => setShowDeleteConfirmation(value)}
        checkedFiles={(checkedFiles) => {
          if (checkedFiles && checkedFiles.length) setShowDeleteButton(checkedFiles.length > 0);
          else setShowDeleteButton(false);
        }}
      ></FileTable>
      <Modal
        hasFooter={true}
        styles={{ content: { height: 'auto', width: 'auto' } }}
        isOpen={isModalOpen}
        title={'Upload File'}
        cancel={() => setIsModalOpen(false)}
        confirm={uploadFile}
        confirmText="Upload"
      >
        <Dropzone onDrop={onDrop} open={() => {}} />
        <FileGrid mediaFiles={uploadedFiles} />
      </Modal>
    </div>
  );
};

export default Files;
