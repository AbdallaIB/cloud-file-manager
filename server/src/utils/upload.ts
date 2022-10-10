import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';

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
  limits: { fieldSize: 10 * 1024 * 1024 },
  //   fileFilter: (req, file, cb) => {
  //     if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
  //       cb(null, true);
  //     } else {
  //       cb(null, false);
  //       const err = new Error('Only .png, .jpg and .jpeg format allowed!');
  //       err.name = 'ExtensionError';
  //       return cb(err);
  //     }
  //   },
}).array('uploadedFiles', 5);

export default upload;
