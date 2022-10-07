import { body } from 'express-validator';
import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { Router } from 'express';
import { FileController } from '@controllers/file';

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
      .toLowerCase()}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage });

const index = (router: Router, fileController: FileController) => {};

export default index;
