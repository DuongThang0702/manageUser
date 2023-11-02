import { Controller, Inject, Get, Query } from '@nestjs/common';
import { Routes, Services } from 'src/utils/path';
import { IUserService } from './interfaces';
import { TQueryGetAll } from 'src/utils/types';

@Controller(Routes.USER)
export class UserController {
  constructor(
    @Inject(Services.USER_SERVICE) private readonly userService: IUserService,
  ) {}

  @Get()
  async GetAllUser(@Query() req: TQueryGetAll) {
    return await this.userService.getAll(req);
  }
}
