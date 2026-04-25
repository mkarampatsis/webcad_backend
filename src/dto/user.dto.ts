import { RoleDTO } from "./role.dto";

export interface CreateGoogleUserDTO {
  userId: string;
  email: string;
  name: string;
  photoUrl?: string;
  roles?: string[];
}

export interface ResponseGoogleUserDTO {
  id: string;
  userId: string;
  email: string;
  name: string;
  photoUrl?: string;
  roles?: RoleDTO[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateRegisteredUserDTO {
  userId: string;
  email: string;
  name: string;
  password: string;
  photoUrl?: string;
  roles?: string[];
}

export interface UpdateRegisteredUserDTO {
  name?: string;
  password?: string;
  roles?: string[];
}

export interface ResponseRegisteredUserDTO {
  id: string;
  userId: string;
  email: string;
  name: string;
  roles?: RoleDTO[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSessionDTO {
  userId: string;
  email: ResponseRegisteredUserDTO;
}