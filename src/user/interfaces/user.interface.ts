import { UserDocument } from 'src/utils/schema';

export interface IUserService {
  login(): Promise<any>;
  lgout(): Promise<any>;
}
