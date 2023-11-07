import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Services } from 'src/utils/path';
import { LoginSucess } from '../dtos/login';
import { Role } from 'src/utils/contants';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(Services.AUTH_SERVICE) private readonly authService: AuthService,
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<LoginSucess> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async adminRole(user: LoginSucess) {
    if (user.role !== Role.AMDIN)
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
  }
}
