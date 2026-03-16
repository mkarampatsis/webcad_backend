import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { ensureUserFolder } from '../utils/fsUtils';
import { config } from '../config/env';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      const email = req.params.email as string;
      // Normalize email (avoid accidental spaces)
      const safeEmail = email.trim().toLowerCase();

      // Prevent directory traversal attacks
      if (safeEmail.includes("..") || safeEmail.includes("/") || safeEmail.includes("\\")) {
        return { status:false, message:'Invalid email format', files:[]}
      }

      const folder = ensureUserFolder(email);

      cb(null, folder);
    } catch (err) {
      cb(err as Error, "");
    }
  },

  filename: (_req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
    cb(null, Date.now() + "_" + safeName);
  }
});

export const upload = multer({ storage });
