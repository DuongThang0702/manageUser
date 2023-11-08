import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AdmissionsModule } from './admissions/admissions.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local', '.env.product'],
    }),
    MongooseModule.forRoot(process.env.URL_CONNECT),
    AdmissionsModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
