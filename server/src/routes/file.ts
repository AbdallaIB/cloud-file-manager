import { body, param } from 'express-validator';
import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { Router } from 'express';
import { FileController } from '@controllers/file';
import { validateToken } from '@middlewares/auth';
import { validateRequest } from '@middlewares/validator';
import { deleteLocalCopy } from '@utils/utils';

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
  router.get(
    '/file/:id',
    [param('id').isEmpty().withMessage('File id missing')],
    validateRequest,
    validateToken,
    fileController.getFile,
  );
  // delete a file
  router.delete(
    '/file/:id',
    [param('id').isEmpty().withMessage('File id missing')],
    validateRequest,
    validateToken,
    fileController.deleteFile,
  );
  // save a file
  router.post(
    '/file',
    upload.single('file'),
    (req, res, next) => {
      req.body.file = req.file;
      next();
    },
    [
      body('file')
        .custom((file) => file)
        .withMessage('File not found. Please try again.'), // custom error message that will be send back if the file in not a pdf.
      body('file')
        .custom((file) => {
          if (!file) return false;
          const { size, filename } = file;
          const maxFileSize = 10000000;
          const filePath = path.resolve(__dirname, `../../uploads/${filename}`);

          if (size > maxFileSize) {
            // If greater than 10MB
            deleteLocalCopy(filePath);
            return false;
          }
          return true;
        })
        .withMessage('The selected image is too big. Please choose one that is smaller than 10 MB.'), // custom error message that will be send back if the file in not a pdf.
    ],
    validateRequest,
    validateToken,
    fileController.saveFile,
  );
};

export default index;
