import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  ProgramRepository } from './program.repository';
import { AuthModule } from 'src/auth/auth.module';
import { ProgramService } from './program.service';
import { ProgramController } from './program.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramRepository]), AuthModule],
  providers: [ProgramService],
  controllers: [ProgramController],
  exports:[ProgramService]
})
export class ProgramModule {}
