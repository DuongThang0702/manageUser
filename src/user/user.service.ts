import { Injectable } from '@nestjs/common';
import { IUserService } from './interfaces';
import { Document, Model, Types } from 'mongoose';
import { AdmissionsList, UserDocument } from 'src/utils/schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectModel(AdmissionsList.name)
    private readonly userModel: Model<AdmissionsList>,
  ) {}
  async getAll(): Promise<UserDocument[]> {
    const response = await this.userModel.find();
    return response;
  }
}
