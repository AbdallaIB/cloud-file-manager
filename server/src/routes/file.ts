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
  // get a file
  router.get('/file/:id', fileController.getFile);
  // delete a file
  router.delete('/file/:id', fileController.deleteFile);
  // save a file
  router.post('/file', upload.single('file'), fileController.saveFile);
};

export default index;
