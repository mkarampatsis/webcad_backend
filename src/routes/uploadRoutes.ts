import { Router } from 'express';
import { requireUser } from '../middleware/authMiddleware';
import * as uploadCtrl from '../controllers/upload_files.controller'
import { upload } from '../middleware/uploads';

const router = Router();

router.get('/getfiles/:email',requireUser, uploadCtrl.getFilesByEmail )
router.post('/:email',requireUser, upload.single('file'), uploadCtrl.uploadFile);

export default router;
