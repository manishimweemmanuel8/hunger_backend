/* eslint-disable prettier/prettier */

import { IsBoolean, IsString } from 'class-validator';

export class DistrictDTO {
  name: string;
  password:string;
  email:string;
  description: string;
  status: string;
}
