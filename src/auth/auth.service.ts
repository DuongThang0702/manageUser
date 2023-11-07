import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { IUserAdminService } from 'src/user/interfaces';
import { Services } from 'src/utils/path';
import { UserDocument } from 'src/utils/schema';
import { LoginSucess } from './dtos/login';

@Injectable()
export class AuthService {
  constructor(
    @Inject(Services.USER_SERVICE_ADMIN)
    private readonly userService: IUserAdminService,
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
