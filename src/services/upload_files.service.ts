import multer from 'multer';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const UPLOADS_BASE_PATH = process.env.UPLOADS_BASE_PATH || '';

export const getFilesByEmail = async (email: string) => {
  console.log('Getting user files for:', email);

  // Normalize email (avoid accidental spaces)
  const safeEmail = email.trim().toLowerCase();

  // Prevent directory traversal attacks
  if (safeEmail.includes("..") || safeEmail.includes("/") || safeEmail.includes("\\")) {
    return { status:false, message:'Invalid email format', files:[]}
  }

  // Build the full path: /uploads/<email>
  const userFolder = path.join(UPLOADS_BASE_PATH, safeEmail);

  try {
    // Check if folder exists
    const stat = await fs.stat(userFolder);
    if (!stat.isDirectory()) {
      return { status:false, message:'User path exists but is not a directory', files:[]};
    }
  } catch (err: any) {
    if (err.code === "ENOENT") {
      // Folder does not exist → return empty list
      return { status:false, message:'Folder does not exist or you do not have any  files uploaded', files:[]};
    }
    throw err;
  }

  // Read directory contents
  const files = await fs.readdir(userFolder);

  return { status:true, message:'User files returned', files:files }
}

function sanitizeEmail(email: string): string {
  const safe = email.trim().toLowerCase();
  if (safe.includes("..") || safe.includes("/") || safe.includes("\\")) {
    throw new Error("Invalid email format");
  }
  return safe;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      const email = sanitizeEmail(req.params.email);
      const userFolder = path.join(UPLOADS_BASE_PATH, email);

      if (!fs.existsSync(userFolder)) {
        fs.mkdirSync(userFolder, { recursive: true });
      }

      cb(null, userFolder);
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