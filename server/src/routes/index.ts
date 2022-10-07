import { Router } from 'express';
import defaultRouter from '@routes/default';

const router = Router();

// Default Routes, This line should be the last line of this module.
defaultRouter(router);

export default router;
