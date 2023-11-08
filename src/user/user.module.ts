import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Services } from 'src/utils/path';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/utils/schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [{ provide: Services.USER_SERVICE, useClass: UserService }],
  exports: [{ provide: Services.USER_SERVICE, useClass: UserService }],
})
export class UserModule {}
