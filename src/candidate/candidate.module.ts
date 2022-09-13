import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CandidateController } from './candidate.controller';
import { CandidateService } from './candidate.service';
import { CandidatesRepository } from './candindate.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CandidatesRepository]), AuthModule],
  controllers: [CandidateController],
  providers: [CandidateService],
  exports:[CandidateService]
})
export class CandidateModule {}
