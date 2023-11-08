import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdmissionsDocument = HydratedDocument<Admissions>;

@Schema({
  collection: 'AdmissionsList',
  timestamps: true,
})
export class Admissions {
  @Prop()
  hoTen: string;
  @Prop()
  heDaoTao: string;
  @Prop()
  nganhHoc: string[];
  @Prop()
  sdt: string;
}

export const AdmissionsSchema = SchemaFactory.createForClass(Admissions);
