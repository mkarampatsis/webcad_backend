import { isPortFree } from "./isPortFree";
let currentPort = 32000;  
const MAX_PORT = 35000;

// export function allocatePort(): number {
//   // naive allocator; later you can check if port is free
//   return currentPort++;
// }
export async function allocatePort(): Promise<number> {
  let port = currentPort;

  while (port < MAX_PORT) {
    const free = await isPortFree(port);
    if (free) {
      currentPort = port + 1;
      return port;
    }
    port++;
  }

  throw new Error('No free ports available in range 32000–35000');
}