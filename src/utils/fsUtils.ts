import fs from 'fs';
import path from 'path';
import { config } from '../config/env';

export function getUserFolder(email: string): string {
  return path.join(config.uploadsBasePath, email);
}

export function ensureUserFolder(email: string): string {
  const folder = getUserFolder(email);
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
  return folder;
}
