import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { DistrictController } from './district.controller';
import { DistrictRepository } from './district.repository';
import { DistrictService } from './district.service';

@Module({
  imports:[TypeOrmModule.forFeature([DistrictRepository]), AuthModule],
  controllers: [DistrictController],
  providers: [DistrictService]
})
export class DistrictModule {}
