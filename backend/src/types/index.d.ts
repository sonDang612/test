import { ERole } from "../constants/enums/role";

export type Account = {
  id?: number | undefined;
  nickName?: string | undefined;
  userName?: string | undefined;
  password?: string | undefined;
  role?: ERole;
  createdAt?: string;
  updatedAt?: string;
  isDeleted?: any;
};
