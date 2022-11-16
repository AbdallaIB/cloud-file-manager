import { fileIcons } from '@components/dashboard/FileTypesCard';
import { UploadedFile } from '@pages/Files';
import { formatBytes } from '@utils/index';

const Image = ({ image }: { image: UploadedFile }) => {
  return (
    <div>
      <img alt={`img - ${image.id}`} src={image.src as string} className="max-w-xs max-h-12 object-cover" />
    </div>
  );
};

const FilePreview = ({ file }: { file: UploadedFile }) => {
  const { type } = file;
  console.log(fileIcons, fileIcons[type]);
  return (
    <div className="h-8 w-8">
      <i className={fileIcons[type + 's'] + ' text-3xl'}></i>
    </div>
  );
};

const FileGrid = ({ mediaFiles }: { mediaFiles: UploadedFile[] }) => {
  console.log(mediaFiles);
  const renderFile = (file: UploadedFile) => {
    return (
      <div key={`${file.id}-image`} className="flex flex-col items-center justify-center">
        {file.type === 'image' ? <Image image={file} /> : <FilePreview file={file} />}
        <p className="text-center text-xs">
          {file.name} - {formatBytes(file.size)}
        </p>
      </div>
    );
  };
  return <section className="flex flex-wrap m-4">{mediaFiles.map(renderFile)}</section>;
};

export default FileGrid;
