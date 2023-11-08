import { AdmissionsDocument } from 'src/utils/schema';
import { TQueryGetAll } from 'src/utils/types';

export interface IAdmissionService {
  getAll(
    req: TQueryGetAll,
  ): Promise<{ counts: number; users: AdmissionsDocument[] }>;
}
