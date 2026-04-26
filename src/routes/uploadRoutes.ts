import { Router } from 'express';
import { authenticate } from '../middleware/authMiddleware';
import * as uploadCtrl from '../controllers/upload_files.controller'
import { upload } from '../middleware/uploads';

const router = Router();

router.get('/getfiles/:email',authenticate, uploadCtrl.getFilesByEmail )
router.post('/:email',authenticate, upload.single('file'), uploadCtrl.uploadFile);

export default router;
