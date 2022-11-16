export const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const PageTitles = {
  '/': 'Dashboard | File Manager',
  '/files': 'Files | File Manager',
  '/login': 'Login | File Manager',
  '/signup': 'Sign Up | File Manager',
};

export const getMediaType = (extension: string) => {
  switch (extension) {
    case '.jpeg':
    case '.jpg':
    case '.png':
    case '.tiff':
    case '.gif':
    case '.psd':
    case '.svg':
      return 'image';
    case '.mp4':
    case '.avi':
    case '.flv':
    case '.avchd':
    case '.f4v':
    case '.m4b':
    case '.mov':
      return 'video';
    case '.mp3':
    case '.wav':
    case '.m4a':
      return 'audio';
    case '.pdf':
    case '.csv':
    case '.doc':
    case '.docx':
    case '.xls':
    case '.xlsx':
    case '.ppt':
    case '.pptx':
    case '.txt':
    case '.rtf':
    case '.odt':
    case '.ods':
    case '.odp':
    case '.odg':
    case '.odc':
    case '.odf':
    case '.html':
    case '.key':
    case '.htm':
    case '.xml':
    default:
      return 'document';
  }
};
