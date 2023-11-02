import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local', '.env.product'],
    }),
    MongooseModule.forRoot(process.env.URL_CONNECT),
    UserModule,
  ],
})
export class AppModule {}
