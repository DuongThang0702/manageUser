import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Services } from 'src/utils/path';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.KEY_ACCESSTOKEN,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    {
      provide: Services.AUTH_SERVICE,
      useClass: AuthService,
    },
    LocalStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
