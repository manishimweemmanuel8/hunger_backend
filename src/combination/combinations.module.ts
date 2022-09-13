import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CombinationsRepository } from './combination.repository';
import { CombinationsController } from './combinations.controller';
import { CombinationsService } from './combinations.service';

@Module({
  imports: [TypeOrmModule.forFeature([CombinationsRepository]), AuthModule],
  providers: [CombinationsService],
  controllers: [CombinationsController],
  exports:[CombinationsService]
})
export class CombinationsModule {}
