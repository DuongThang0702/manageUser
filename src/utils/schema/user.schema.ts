import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  collection: 'Users',
  timestamps: true,
})
export class User {
  @Prop({ unique: true })
  email: string;
  @Prop()
  hoTen: string;
  @Prop()
  sdt: string;
  @Prop()
  password: string;
  @Prop()
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
