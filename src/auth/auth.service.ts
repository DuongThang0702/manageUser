import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Services } from 'src/utils/path';
import { UserDocument } from 'src/utils/schema';
import { LoginSucess } from './dtos/login';
import { IAdmissionService } from 'src/admissions/interfaces';
import { IUserService } from 'src/user/interfaces/interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(Services.USER_SERVICE)
    private readonly userService: IUserService,
  ) {}
  async validateUser(email: string, pass: string): Promise<LoginSucess | null> {
    const user: UserDocument = await this.userService.getUserByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }
}
