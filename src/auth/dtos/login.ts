import { Types } from 'mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';
export class Login {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}
export class LoginSucess {
  @Expose()
  email: string;
  @Expose()
  hoTen: string;
  @Expose()
  heDaoTao: string;
  @Expose()
  nganhHoc: string;
  @Expose()
  role: string;
  @Expose()
  sdt: string;
  @Expose()
  _id: Types.ObjectId;
}
