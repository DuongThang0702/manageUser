import {
  Controller,
  Inject,
  Get,
  Query,
  Post,
  Body,
  UseGuards,
  Param,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/path';
import { IUserService, IUserAdminService } from './interfaces';
import {
  CreateUserByAdminDto,
  TQueryGetAll,
  UpdateUserByAdminDto,
} from 'src/utils/types';
import { LocalAuthGuard } from 'src/auth/guards';

@Controller(Routes.USER)
export class UserController {
  constructor(
    @Inject(Services.USER_SERVICE_ADMIN)
    private readonly userAdmin: IUserAdminService,
  ) {}

  @Get()
  async GetAllUser(@Query() req: TQueryGetAll) {
    return await this.userAdmin.getAll(req);
  }

  @Post()
  async CreateUserByAdmin(@Body() data: CreateUserByAdminDto) {
    return await this.userAdmin.createUserByAdmin(data);
  }

  @Post(':idU')
  async UpdateUserByAdmin(
    @Body() data: UpdateUserByAdminDto,
    @Param() param: { idU: string },
  ) {
    return await this.userAdmin.updateUserByAdmin(param.idU, data);
  }
}
