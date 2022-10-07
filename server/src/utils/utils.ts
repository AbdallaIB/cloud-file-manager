import * as fs from 'fs';
import loggerHandler from '@utils/logger';
const moduleName = '[util] ';
const logger = loggerHandler(moduleName);

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

export const deleteLocalCopy = (path: string) => {
  try {
    if (!fs.existsSync(path)) {
      return;
    }
    fs.unlink(path, (err) => {
      if (err) {
        logger.error('[deleteLocalCopy][error]', err);
        return;
      }
      logger.info('[deleteLocalCopy][file deleted successfully]');
    });
    return;
  } catch (e) {
    logger.error('[deleteLocalCopy][error]', e);
  }
};
