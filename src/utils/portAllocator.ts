let currentPort = 32000;

export function allocatePort(): number {
  // naive allocator; later you can check if port is free
  return currentPort++;
}
