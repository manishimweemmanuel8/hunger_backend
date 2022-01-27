import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignRepository } from './campaign.repository';
import { AuthModule } from '../auth/auth.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports:[TypeOrmModule.forFeature([CampaignRepository]),AuthModule,CloudinaryModule,MailModule],
  providers: [CampaignService],
  controllers: [CampaignController],
  exports:[CampaignService]
})
export class CampaignModule {}
