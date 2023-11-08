import {
  Controller,
  Inject,
  Get,
  Post,
  Body,
  Req,
  Param,
  Patch,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/path';
import { IUserService } from './interfaces/interface';
import { CreateUserByAdminDto, UpdateUserByAdminDto } from 'src/utils/types';

@Controller(Routes.USER)
export class UserController {
  constructor(
    @Inject(Services.USER_SERVICE) private readonly userService: IUserService,
  ) {}

  @Get()
  async getAllUser(@Req() req) {
    return await this.userService.getAllUser(req);
  }

  @Post()
  async createUser(@Body() data: CreateUserByAdminDto) {
    return await this.userService.createUserByAdmin(data);
  }

  @Patch(':id')
  async updateInformation(
    @Param() params: { id: string },
    @Body() data: UpdateUserByAdminDto,
  ) {
    return await this.userService.updateUserByAdmin(params.id, data);
  }
}
