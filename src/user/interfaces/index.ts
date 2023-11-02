import { UserDocument } from 'src/utils/schema';

export interface IUserService {
  getAll(): Promise<UserDocument[]>;
}
