import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { AboutController } from './about.controller';
import { AboutRepository } from './about.repository';
import { AboutService } from './about.service';

@Module({
  imports: [TypeOrmModule.forFeature([AboutRepository]), AuthModule],
  controllers: [AboutController],
  providers: [AboutService],
})
export class AboutModule {}
