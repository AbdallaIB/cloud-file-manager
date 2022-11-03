import { UploadedFile } from '@pages/Files';
import { formatBytes } from '@utils/index';

const Image = ({ image }: { image: UploadedFile }) => {
  return (
    <div>
      <img alt={`img - ${image.id}`} src={image.src as string} className="max-w-xs max-h-12 object-cover" />
    </div>
  );
};

const ImageGrid = ({ mediaFiles }: { mediaFiles: UploadedFile[] }) => {
  // render each image by calling Image component
  const renderImage = (image: UploadedFile) => {
    return (
      <div key={`${image.id}-image`} className="flex flex-col items-center justify-center">
        <Image image={image} />
        <p className="text-center text-xs">
          {image.name} - {formatBytes(image.size)}
        </p>
      </div>
    );
  };
  return <section className="flex flex-wrap m-4">{mediaFiles.map(renderImage)}</section>;
};

export default ImageGrid;
