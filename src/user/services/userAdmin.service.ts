import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUserAdminService } from '../interfaces';
import { Document, Model, Types } from 'mongoose';
import { AdmissionsList, UserDocument } from 'src/utils/schema';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreateUserByAdminDto,
  TQueryGetAll,
  UpdateUserByAdminDto,
} from 'src/utils/types';
import * as moment from 'moment';
import { Role } from 'src/utils/contants';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserAdminService implements IUserAdminService {
  constructor(
    @InjectModel(AdmissionsList.name)
    private readonly userModel: Model<AdmissionsList>,
  ) {}
  async getUserByEmail(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email });
    if (user === null)
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    return user;
  }
  async updateUserByAdmin(
    idU: string,
    payload: UpdateUserByAdminDto,
  ): Promise<UserDocument> {
    const user = await this.userModel.findById(idU);
    if (user === null)
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    const response = user.updateOne({ ...payload });
    if (response === null)
      throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
    return response;
  }
  async createUserByAdmin(data: CreateUserByAdminDto): Promise<UserDocument> {
    const matchEmail = await this.userModel.findOne({ email: data.email });
    if (matchEmail)
      throw new HttpException('Email has been existed', HttpStatus.BAD_REQUEST);
    const newUser = new this.userModel({
      ...data,
      role: Role.MEMEBER,
      password: uuid(),
    });
    const response = await newUser.save();
    if (response === null)
      throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
    else return response;
  }

  async getAll(
    req: TQueryGetAll,
  ): Promise<{ counts: number; users: UserDocument[] }> {
    const today = moment().startOf('day');
    let queryCommand;

    let start = new Date(req.day);
    start.setHours(0, 0, 0, 0);
    let end = new Date(req.day);
    end.setHours(23, 59, 59, 999);
    if (req.day) {
      queryCommand = this.userModel
        .find({
          createdAt: {
            $gte: start,
            $lte: end,
          },
        })
        .sort('-createdAt');
    } else {
      queryCommand = this.userModel
        .find({
          createdAt: {
            $gte: today.toDate(),
            $lte: moment(today).endOf('day').toDate(),
          },
        })
        .sort('-createdAt');
    }

    const page = parseInt(req.page) || 1;
    const limit = parseInt(req.limit) || parseInt(process.env.LIMIT);
    const skip = (page - 1) * limit;
    queryCommand.limit(limit).skip(skip);

    return queryCommand
      .exec()
      .then(async (rs) => {
        const counts = await this.userModel
          .find(
            req.day
              ? {
                  createdAt: {
                    $gte: start,
                    $lte: end,
                  },
                }
              : {
                  createdAt: {
                    $gte: today.toDate(),
                    $lte: moment(today).endOf('day').toDate(),
                  },
                },
          )
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
