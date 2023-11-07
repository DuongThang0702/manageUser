import { LoginSucess } from '../dtos/login';

export interface IAuth {
  login(): Promise<LoginSucess>;
}
