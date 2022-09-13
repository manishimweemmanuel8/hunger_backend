import { Module } from '@nestjs/common';
import {  ScholorshipService } from './scholorship.service';
import {  ScholorshipController } from './scholorship.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  ScholorshipRepository } from './scholorship.repository';
import { AuthModule } from '../auth/auth.module';
// import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ScholorshipRepository]),
    AuthModule,
    // MailModule,
  ],
  providers: [ScholorshipService],
  controllers: [ScholorshipController],
  exports: [ScholorshipService],
})
export class ScholorShipModule {}
