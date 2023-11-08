import { Controller, Inject, Get, Query, Body, Post } from '@nestjs/common';
import { Routes, Services } from 'src/utils/path';
import { IAdmissionService } from './interfaces';
import { TQueryGetAll } from 'src/utils/types';
import { CreateAdmissionDto } from './dtos';

@Controller(Routes.ADMISSION)
export class AdmissionController {
  constructor(
    @Inject(Services.ADMISSION_SERVICE_ADMIN)
    private readonly AdmissionService: IAdmissionService,
  ) {}

  @Get()
  async GetAllUser(@Query() req: TQueryGetAll) {
    return await this.AdmissionService.getAll(req);
  }
  @Post()
  async CreateAdmission(@Body() data: CreateAdmissionDto) {
    return await this.AdmissionService.createAdmission(data);
  }
}
