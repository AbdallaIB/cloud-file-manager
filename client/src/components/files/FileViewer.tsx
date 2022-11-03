import { MediaFile } from '@lib/stores/file';

const FileViewerStyles = {
  width: '100%',
  height: '100%',
};

const FileViewer = ({ file }: { file: MediaFile }) => {
  const renderFile = (type: MediaFile['type'], id: number) => {
    switch (type) {
      case 'image':
        return <img style={FileViewerStyles} src={file.url} alt={file.name} />;
      case 'video':
        return <video style={FileViewerStyles} src={file.url} controls />;
      case 'audio':
        return <audio src={file.url} controls />;
      case 'document':
        return <iframe style={FileViewerStyles} title={file.id + 'doc'} src={file.url} />;
      default:
        return <div>Unsupported file type</div>;
    }
  };
  return <div className="m-8 h-full w-full flex items-center justify-center">{renderFile(file.type, file.id)}</div>;
};

export default FileViewer;
