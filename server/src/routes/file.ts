import { body, param } from 'express-validator';
import { Router } from 'express';
import { FileController } from '@controllers/file';
import { validateToken } from '@middlewares/auth';
import { validateRequest } from '@middlewares/validator';
import upload from '@utils/upload';

const index = (router: Router, fileController: FileController) => {
  // get user files
  router.get('/file', validateToken, fileController.getUserFiles);
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
    '/file',
    [body('files').exists({ checkFalsy: true }).withMessage('File id missing')],
    validateRequest,
    validateToken,
    fileController.deleteFile,
  );
  // save a file
  router.post(
    '/file',
    upload,
    (req, res, next) => {
      console.log(req.body, req.files);
      req.body.files = req.files;
      next();
    },
    [
      body('files')
        .custom((file) => file && file.length > 0)
        .withMessage('File not found. Please try again.'), // custom error message that will be send back if the file in not a pdf.
    ],
    validateRequest,
    validateToken,
    fileController.saveFile,
  );
};

export default index;
