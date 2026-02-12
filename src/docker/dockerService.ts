import { exec } from 'child_process';
import { config } from '../config/env';

function run(cmd: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) return reject(stderr || err.message);
      resolve(stdout.trim());
    });
  });
}

export async function startStudentContainer(
  userId: string,
  hostPort: number,
  folderPath: string
): Promise<string> {
  const containerName = `student_${userId}`;
  const cmd = [
    'docker run -d',
    `-v ${folderPath}:/opt/student_files`,
    `-p ${hostPort}:6080`,
    `--name ${containerName}`,
    config.dockerImage
  ].join(' ');

  const containerId = await run(cmd);
  return containerName;
}

export async function stopStudentContainer(containerName: string): Promise<void> {
  await run(`docker stop ${containerName} || true`);
  await run(`docker rm ${containerName} || true`);
}
