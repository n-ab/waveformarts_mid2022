import * as express from 'express';

import { app as userRouter } from '../routers/userRouter';
import { app as fileRouter } from '../routers/fileRouter';

export const router = express.Router();

router.use('/user',         userRouter);
router.use('/file',         fileRouter);