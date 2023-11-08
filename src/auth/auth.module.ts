import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Services } from 'src/utils/path';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [UserModule],
  providers: [
    {
      provide: Services.AUTH_SERVICE,
      useClass: AuthService,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
