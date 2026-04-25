export interface CreateSessionDTO {
  userId: string;
  email: string;  
  containerName: string
  hostPort: number;
  folderPath: string;
  status: string;
}
export interface UpdateSessionDTO {
  status: string;
  lastActivityAt: Date;
}

export interface ResponseSessionDTO {
  id: string;
  userId: string;
  email: string;  
  containerName: string
  hostPort: number;
  folderPath: string;
  status: string;
  startedAt: Date;
  lastActivityAt: Date;
  createdAt: Date;
  updatedAt: Date;
}