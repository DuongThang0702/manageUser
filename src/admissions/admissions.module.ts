import { Module } from '@nestjs/common';
import { AdmissionController } from './admission.controller';
import { AdmissionService } from './services';
import { Services } from 'src/utils/path';
import { MongooseModule } from '@nestjs/mongoose';
import { Admissions, AdmissionsSchema } from 'src/utils/schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Admissions.name, schema: AdmissionsSchema },
    ]),
  ],
  controllers: [AdmissionController],
  providers: [
    {
      provide: Services.ADMISSION_SERVICE_ADMIN,
      useClass: AdmissionService,
    },
  ],
})
export class AdmissionsModule {}
