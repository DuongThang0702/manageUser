import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
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
  ],
})
export class UserModule {}
