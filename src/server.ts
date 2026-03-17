import dotenv from 'dotenv';
import fs from 'fs';

// If .env.local exists, load it and override values
if (fs.existsSync('.env.local')) {
  dotenv.config({ path: '.env.local', override: true });
}

import app from './app';
import './config/mongo';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
