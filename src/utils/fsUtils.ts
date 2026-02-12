import fs from 'fs';
import path from 'path';
import { config } from '../config/env';

export function getUserFolder(userId: string): string {
  return path.join(config.uploadsBasePath, userId);
}

export function ensureUserFolder(userId: string): string {
  const folder = getUserFolder(userId);
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
  return folder;
}
