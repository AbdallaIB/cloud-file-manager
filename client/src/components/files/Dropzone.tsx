import Button from '@components/shared/Button';
import { useDropzone } from 'react-dropzone';
interface Props {
  onDrop: (acceptedFiles: File[]) => void;
  open: () => void;
}
const Dropzone = ({ onDrop, open }: Props) => {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
  });

  return (
    <div
      className="flex justify-center items-center flex-col"
      style={{ width: '60vw', height: acceptedFiles.length > 0 ? '40vh' : '70vh' }}
    >
      <div
        {...getRootProps({
          className:
            'dropzone flex justify-center items-center my-4 flex-col h-full w-full border-dashed border-gray-300 border-2',
        })}
      >
        <input className="input-zone" {...getInputProps()} />
        <div className="text-center flex justify-center items-center flex-col h-full w-full gap-4">
          {isDragActive ? (
            <p className="dropzone-content font-medium text-2xl">Release to drop the file here</p>
          ) : (
            <p className="dropzone-content font-medium text-2xl">Drag & Drop to upload file</p>
          )}
          <p>OR</p>
          <Button text="Browse File" onClick={open} isPrimary={false} color="gray"></Button>
          {/* <button
            type="button"
            className="flex gap-1 justify-center items-center flex-row shrink-0 rounded bg-gray-200 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700"
          ></button> */}
        </div>
      </div>
    </div>
  );
};
export default Dropzone;
