import { Controller, Inject, Get } from '@nestjs/common';
import { Routes, Services } from 'src/utils/path';
import { IUserService } from './interfaces';

@Controller(Routes.USER)
export class UserController {
  constructor(
    @Inject(Services.USER_SERVICE) private readonly userService: IUserService,
  ) {}

  @Get()
  async GetAllUser() {
    return await this.userService.getAll();
  }
}
