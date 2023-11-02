import { Injectable } from '@nestjs/common';
import { IUserService } from './interfaces';
import { Model } from 'mongoose';
import { AdmissionsList, UserDocument } from 'src/utils/schema';
import { InjectModel } from '@nestjs/mongoose';
import { TQueryGetAll } from 'src/utils/types';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectModel(AdmissionsList.name)
    private readonly userModel: Model<AdmissionsList>,
  ) {}
  async getAll(
    req: TQueryGetAll,
  ): Promise<{ counts: number; users: UserDocument[] }> {
    const queryCommand = this.userModel
      .find({ createdAt: { $eq: req.day ? req.day : new Date() } })
      .sort('-createdAt');

    const page = parseInt(req.page) || 1;
    const limit = parseInt(req.limit) || parseInt(process.env.LIMIT);
    const skip = (page - 1) * limit;
    queryCommand.limit(limit).skip(skip);

    return queryCommand
      .exec()
      .then(async (rs) => {
        const counts = await this.userModel
          .find({ createdAt: { $eq: req.day ? req.day : new Date() } })
          .countDocuments();
        return {
          counts,
          users: rs,
        };
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}
