import {
  Controller,
  Post,
  Req,
  UseGuards,
  Body,
  Inject,
  Get,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/path';
import { LocalAuthGuard } from './guards';
import { Login } from './dtos/login';
import { AuthService } from './auth.service';
import { CreateUserByAdminDto } from 'src/utils/types';
import { IAdmissionService } from 'src/admissions/interfaces';
import { IUserService } from 'src/user/interfaces/interface';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH_SERVICE) private readonly authService: AuthService,
    @Inject(Services.USER_SERVICE)
    private readonly userAdminService: IUserService,
  ) {}

  @Post('login')
  async login(@Body() payload: Login) {
    return await this.authService.validateUser(payload.email, payload.password);
  }

  @Post('register')
  async register(@Body() payload: CreateUserByAdminDto) {
    return await this.userAdminService.createUserByAdmin(payload);
  }
}
