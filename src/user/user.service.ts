import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';
import { Services } from 'src/utils/path';
import { User, UserDocument } from 'src/utils/schema';
import { IUserService } from './interfaces/interface';
import {
  CreateUserByAdminDto,
  TQueryGetAll,
  UpdateUserByAdminDto,
} from 'src/utils/types';
import { Role } from 'src/utils/contants';
import { MailerService } from '@nestjs-modules/mailer';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectModel(User.name) private readonly userModal: Model<User>,
    private readonly mailerService: MailerService,
  ) {}
  getAllUser(req: TQueryGetAll): Promise<{
    counts: number;
    users: UserDocument[];
  }> {
    let queryCommand = this.userModal.find();
    const page = parseInt(req.page) || 1;
    const limit = parseInt(req.limit) || parseInt(process.env.LIMIT);
    const skip = (page - 1) * limit;
    queryCommand.limit(limit).skip(skip);
    return queryCommand
      .exec()
      .then(async (rs) => {
        const counts = await this.userModal.find().countDocuments();
        return {
          counts,
          users: rs,
        };
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
  async getUserByEmail(email: string): Promise<UserDocument> {
    const user = await this.userModal.findOne({ email });
    if (user === null)
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    return user;
  }
  async updateUserByAdmin(
    idU: string,
    payload: UpdateUserByAdminDto,
  ): Promise<UserDocument> {
    const user = await this.userModal.findById(idU);
    if (user === null)
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    const response = user.updateOne({ ...payload });
    if (response === null)
      throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
    return response;
  }
  async createUserByAdmin(data: CreateUserByAdminDto): Promise<UserDocument> {
    const matchEmail = await this.userModal.findOne({ email: data.email });
    if (matchEmail)
      throw new HttpException('Email has been existed', HttpStatus.BAD_REQUEST);
    const newUser = new this.userModal({
      ...data,
      role: Role.MEMEBER,
      password: uuid(),
    });
    const response = await newUser.save();
    if (response === null)
      throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
    else {
      await this.mailerService.sendMail({
        to: response.email,
        subject: 'Send your Password',
        template: './sendpassword',
        context: {
          name: response.hoTen,
          password: response.password,
        },
      });
      return response;
    }
  }

  async deleteUser(uid: string) {
    return await this.userModal.findByIdAndDelete(uid);
  }
}
