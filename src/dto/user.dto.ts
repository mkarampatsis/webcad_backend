import { RoleDTO } from "./role.dto";

export interface CreateGoogleUserDTO {
  userId: string;
  email: string;
  name: string;
  photoUrl?: string;
  roles?: string[];
}

export interface CreateRegisteredUserDTO {
  userId: string;
  email: string;
  name: string;
  password: string;
  photoUrl?: string;
  roles?: string[];
}

export interface ResponseUserDTO {
  id: string;
  userId: string;
  email: string;
  name: string;
  photoUrl?: string;
  roles?: RoleDTO[];
}

export interface UpdateUserDTO {
  name?: string;
  password?: string;
  roles?: string[];
}


export interface CreateSessionDTO {
  userId: string;
  email: string;
}

export interface UpdateSessionDTO {
  status: string;
  lastActivityAt: Date;
}