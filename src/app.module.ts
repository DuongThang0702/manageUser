import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user/services/user.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local', '.env.product'],
    }),
    MongooseModule.forRoot(process.env.URL_CONNECT),
    UserModule,
    AuthModule,
  ],
  providers: [UserService],
})
export class AppModule {}
