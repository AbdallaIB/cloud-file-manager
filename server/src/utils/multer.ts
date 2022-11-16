import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';

const oneMegaByteInBytes = 1048576;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    /// check if uploads folder exists
    // directory to check
    const dir = path.resolve('./uploads');
    // check if directory exists
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const extArray = file.mimetype.split('/');
    const extension = extArray[extArray.length - 1];
    const fileName = `${file.originalname
      .replace(/[^a-zA-Z0-9]/g, '')
      .replace(/\s/g, '')
      .replace('?', '')
      .toLowerCase()
      .substring(0, file.originalname.lastIndexOf('.') - 1)
      .substring(0, 25)}.${extension}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  limits: {
    fieldNameSize: 300,
    fileSize: oneMegaByteInBytes, // 10 Mb
  },
  fileFilter: (req, file, callback) => {
    const fileSize = parseInt(req.headers['content-length']);
    if (fileSize > oneMegaByteInBytes) {
      return callback(new Error('Total file sizes must be less than 10 Mb.'));
    }
    callback(null, true);
  },
}).array('uploadedFiles', 5);

export default upload;
