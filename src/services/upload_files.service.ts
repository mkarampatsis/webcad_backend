import multer from 'multer';
import fs from 'fs/promises';
import path from 'path';
import { config } from '../config/env';

export const getFilesByEmail = async (email: string) => {
  console.log('Getting user files for:', email);

  // Normalize email (avoid accidental spaces)
  const safeEmail = email.trim().toLowerCase();

  // Prevent directory traversal attacks
  if (safeEmail.includes("..") || safeEmail.includes("/") || safeEmail.includes("\\")) {
    return { status:false, message:'Invalid email format', files:[]}
  }

  // Build the full path: /uploads/<email>
  const userFolder = path.join(config.uploadsBasePath, safeEmail);

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