import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import './config/mongo';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
