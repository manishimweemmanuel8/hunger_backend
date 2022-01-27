/* eslint-disable prettier/prettier */

import { Double } from 'typeorm';

export class DonateDTO {
  names: string;
  email: string;
  phone: string;
  campaignId: string;
  description: string;
  quantity?: number;
  amount?: number;
  location: string;
  received?: boolean;
}
