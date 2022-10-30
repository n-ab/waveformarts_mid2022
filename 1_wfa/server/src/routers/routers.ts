import * as express from 'express';

import { app as userRouter } from '../routers/userRouter';
import { app as fileRouter } from '../routers/fileRouter';
import { app as adminRouter } from '../routers/adminRouter';
import { app as metricsRouter } from '../routers/metricsRouter';
import { app as projectRouter } from '../routers/projectRouter';
 
export const router = express.Router();

router.use('/user',         userRouter);
router.use('/file',         fileRouter);
router.use('/admin',        adminRouter)
router.use('/metrics',      metricsRouter);
router.use('/project',      projectRouter);