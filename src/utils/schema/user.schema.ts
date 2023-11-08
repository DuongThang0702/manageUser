import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<AdmissionsList>;

@Schema({
  collection: 'AdmissionsList',
  timestamps: true,
})
export class AdmissionsList {
  @Prop({ unique: true })
  username: string;
  @Prop({ unique: true })
  email: string;
  @Prop()
  hoTen: string;
  @Prop()
  heDaoTao: string;
  @Prop()
  nganhHoc: string;
  @Prop()
  sdt: string;
  @Prop()
  password: string;
  @Prop()
  role: string;
}

export const AdmissionsListSchema =
  SchemaFactory.createForClass(AdmissionsList);
