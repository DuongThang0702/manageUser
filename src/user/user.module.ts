import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserAdminService, UserService } from './services/';
import { Services } from 'src/utils/path';
import { MongooseModule } from '@nestjs/mongoose';
import { AdmissionsList, AdmissionsListSchema } from 'src/utils/schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AdmissionsList.name, schema: AdmissionsListSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: Services.USER_SERVICE,
      useClass: UserService,
    },
    {
      provide: Services.USER_SERVICE_ADMIN,
      useClass: UserAdminService,
    },
  ],
  exports: [
    {
      provide: Services.USER_SERVICE_ADMIN,
      useClass: UserAdminService,
    },
  ],
})
export class UserModule {}
