import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { requireUser } from '../middleware/authMiddleware';
import { ensureUserFolder } from '../utils/fsUtils';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = (req as any).userId as string;
    const folder = ensureUserFolder(userId);
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // or add timestamp
  }
});

const upload = multer({ storage });

// POST /upload/file
router.post('/file', requireUser, upload.single('file'), (req, res) => {
  res.json({ ok: true, filename: req.file?.filename });
});

export default router;
