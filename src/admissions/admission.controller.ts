import { Controller, Inject, Get, Query } from '@nestjs/common';
import { Routes, Services } from 'src/utils/path';
import { IAdmissionService } from './interfaces';
import { TQueryGetAll } from 'src/utils/types';

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
}
