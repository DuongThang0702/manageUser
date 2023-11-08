import { IsNotEmpty } from 'class-validator';

export type CreateAdmission = {
  hoTen: string;
  heDaoTao: string;
  nganhHoc: string[];
  sdt: string;
  email: string;
};

export class CreateAdmissionDto {
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  hoTen: string;
  @IsNotEmpty()
  heDaoTao: string;
  @IsNotEmpty()
  nganhHoc: string[];
  @IsNotEmpty()
  sdt: string;
}
