import { Injectable } from '@nestjs/common';
import { IAdmissionService } from '../interfaces';
import { Model } from 'mongoose';
import { AdmissionsDocument, Admissions } from 'src/utils/schema';
import { InjectModel } from '@nestjs/mongoose';
import { TQueryGetAll } from 'src/utils/types';
import * as moment from 'moment';

@Injectable()
export class AdmissionService implements IAdmissionService {
  constructor(
    @InjectModel(Admissions.name)
    private readonly admissionModel: Model<Admissions>,
  ) {}

  async getAll(
    req: TQueryGetAll,
  ): Promise<{ counts: number; users: AdmissionsDocument[] }> {
    const today = moment().startOf('day');
    let queryCommand;

    let start = new Date(req.day);
    start.setHours(0, 0, 0, 0);
    let end = new Date(req.day);
    end.setHours(23, 59, 59, 999);
    if (req.day) {
      queryCommand = this.admissionModel
        .find({
          createdAt: {
            $gte: start,
            $lte: end,
          },
        })
        .sort('-createdAt');
    } else {
      queryCommand = this.admissionModel
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
        const counts = await this.admissionModel
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
