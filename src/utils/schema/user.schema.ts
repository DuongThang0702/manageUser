import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<AdmissionsList>;

@Schema({
  collection: 'AdmissionsList',
})
export class AdmissionsList {
  @Prop()
  username: string;
  @Prop()
  hoTen: string;
  @Prop()
  heDaoTao: string;
  @Prop()
  nganhHoc: string;
}

export const AdmissionsListSchema =
  SchemaFactory.createForClass(AdmissionsList);
