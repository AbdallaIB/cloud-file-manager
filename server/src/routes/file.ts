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
      .toLowerCase()
      .substring(0, file.originalname.lastIndexOf('.'))
      .substring(0, 25)}.${extension}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage });

const index = (router: Router, fileController: FileController) => {
  router.get('/file/:id', fileController.getFile);
  router.post('/file/:id/delete', fileController.deleteFile);
  router.post('/file/create', upload.single('file'), fileController.saveFile);
};

export default index;
