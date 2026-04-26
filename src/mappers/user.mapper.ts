// import { IUser } from '../models/user.model';
// import { ResponseUserDTO } from '../dto/user.dto';
// import { RoleMapper } from "./role.mapper";

// export const toUserResponseDTO = (user: IUser): ResponseUserDTO => {
//   return {
//     id: user._id.toString(),
//     userId: user.userId,
//     ...(user.name && { name: user.name }),
//     ...(user.email && { email: user.email }),
//     ...(user.photoUrl && { photoUrl: user.photoUrl }),
//     roles: user.roles.map(role => RoleMapper.toDTO(role))
//   };
// };s