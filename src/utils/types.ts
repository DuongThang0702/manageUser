import { IsNotEmpty } from 'class-validator';

export type TQueryGetAll = {
  page: string;
  sort: string;
  limit: string;
  fields: string;
  day: string;
};

export class CreateUserByAdminDto {
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  hoTen: string;
  @IsNotEmpty()
  sdt: string;
}

export type UpdateUserByAdminDto = {
  email?: string;
  hoTen?: string;
  sdt?: string;
  role?: string;
};
