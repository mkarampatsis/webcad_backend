export const config = {
  mongoUri: process.env.MONGO_URI || '',
  jwtSecret: process.env.JWT_SECRET || 'dev-secret',
  saltRounds: parseInt(process.env.SALT_ROUNDS || '10', 10),
  uploadsBasePath: process.env.UPLOADS_BASE_PATH || '/usr/local/webcad',
  dockerImage: process.env.DOCKER_IMAGE || 'webcad_tkapp'
};
