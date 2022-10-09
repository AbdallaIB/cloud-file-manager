import { useDropzone } from 'react-dropzone';
import './index.css';
interface Props {
  onDrop: (acceptedFiles: File[]) => void;
  open: () => void;
}
const Dropzone = ({ onDrop, open }: Props) => {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
  });
  const files = acceptedFiles.map((file) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));
  return (
    <div className="flex justify-center items-center flex-col" style={{ width: '70vw', height: '80vh' }}>
      <div {...getRootProps({ className: 'dropzone flex justify-center items-center flex-col h-full w-full' })}>
        <input className="input-zone" {...getInputProps()} />
        <div className="text-center flex justify-center items-center flex-col h-full w-full gap-4">
          {isDragActive ? (
            <p className="dropzone-content font-medium text-2xl">Release to drop the file here</p>
          ) : (
            <p className="dropzone-content font-medium text-2xl">Drag & Drop to upload file</p>
          )}
          <p>OR</p>
          <button
            type="button"
            onClick={open}
            className="flex gap-1 justify-center items-center flex-row shrink-0 rounded bg-gray-200 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700"
          >
            Browse File
          </button>
        </div>
      </div>
      <aside>
        <ul>{files}</ul>
      </aside>
    </div>
  );
};
export default Dropzone;
