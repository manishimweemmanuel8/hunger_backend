/* eslint-disable prettier/prettier */

import { Double } from 'typeorm';

export class SubscriptionDTO {
  email: string;
  campaignId: string;
  status?: boolean;
}
