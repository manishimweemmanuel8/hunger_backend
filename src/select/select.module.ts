import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidateModule } from 'src/candidate/candidate.module';
import { CriterialModule } from 'src/criterial/criterial.module';
import { MailModule } from 'src/mail/mail.module';
import { ScholorShipModule } from 'src/scholorship/scholorship.module';
import { SelectController } from './select.controller';
import { SelectRepository } from './select.repository';
import { SelectService } from './select.service';

@Module({
  imports: [TypeOrmModule.forFeature([SelectRepository]),ScholorShipModule,CriterialModule,MailModule,CandidateModule],
  providers: [SelectService],
  controllers: [SelectController],
})
export class SelectModule {}
