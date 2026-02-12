export const config = {
  mongoUri: process.env.MONGO_URI || '',
  jwtSecret: process.env.JWT_SECRET || 'dev-secret',
  uploadsBasePath: process.env.UPLOADS_BASE_PATH || '/srv/student_files',
  dockerImage: process.env.DOCKER_IMAGE || 'webcad_tkapp'
};
