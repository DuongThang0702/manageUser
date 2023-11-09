import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AdmissionsModule } from './admissions/admissions.module';
import { UserModule } from './user/user.module';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local', '.env.product'],
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.HOST,
        secure: false,
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        },
      },
      defaults: {
        from: `"No Reply" < ${process.env.FORM} >`,
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    MongooseModule.forRoot(process.env.URL_CONNECT),
    AdmissionsModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
