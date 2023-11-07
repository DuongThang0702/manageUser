import { UserDocument } from 'src/utils/schema';
import {
  CreateUserByAdminDto,
  TQueryGetAll,
  UpdateUserByAdminDto,
} from 'src/utils/types';

export interface IUserAdminService {
  getAll(req: TQueryGetAll): Promise<{ counts: number; users: UserDocument[] }>;
  createUserByAdmin(payload: CreateUserByAdminDto): Promise<UserDocument>;
  updateUserByAdmin(
    idU: string,
    payload: UpdateUserByAdminDto,
  ): Promise<UserDocument>;
  getUserByEmail(email: string): Promise<UserDocument>;
}
