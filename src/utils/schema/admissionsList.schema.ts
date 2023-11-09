import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdmissionsDocument = HydratedDocument<Admissions>;

@Schema({
  collection: 'Admissions',
  timestamps: true,
})
export class Admissions {
  @Prop()
  hoTen: string;
  @Prop()
  email: string;
  @Prop()
  heDaoTao: string;
  @Prop()
  nganhHoc: string[];
  @Prop({ unique: true })
  sdt: string;
}

export const AdmissionsSchema = SchemaFactory.createForClass(Admissions);
