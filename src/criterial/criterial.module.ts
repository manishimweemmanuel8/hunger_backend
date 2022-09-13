import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CombinationsModule } from 'src/combination/combinations.module';
import { ProgramModule } from 'src/program/program.module';
import { ScholorShipModule } from 'src/scholorship/scholorship.module';
import { CriterialRepository } from './criterial.repository';
import { CriterialService } from './criterial.service';
import { CriterialController } from './critirial.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([CriterialRepository]),
    ScholorShipModule,
    ProgramModule,
    CombinationsModule,
    AuthModule,
  ],
  providers: [CriterialService],
  controllers: [CriterialController],
  exports:[CriterialService],
})
export class CriterialModule {}
