import { UserDocument } from 'src/utils/schema';
import { TQueryGetAll } from 'src/utils/types';

export interface IUserService {
  getAll(req: TQueryGetAll): Promise<{ counts: number; users: UserDocument[] }>;
}
