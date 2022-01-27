import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { DistrictModule } from './district/district.module';
import { AboutModule } from './about/about.module';
import { ServicesModule } from './services/services.module';
import { ContactModule } from './contact/contact.module';
import { CampaignModule } from './campaign/campaign.module';
import { DonateModule } from './donate/donate.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { extname } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { MailModule } from './mail/mail.module';
import { SubscribtionModule } from './subscription/subscribtion.module';


const imageFilter = function (req, file, cb) {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
  }
  cb(null, true);
};
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
      }),
    }),

    MulterModule.registerAsync({
      useFactory: () => ({
        fileFilter: imageFilter
      }),
    }),
    AuthModule,
    DistrictModule,
    AboutModule,
    ServicesModule,
    ContactModule,
    CampaignModule,
    DonateModule,
    CloudinaryModule,
    MailModule,
    SubscribtionModule,
  ],
  controllers: [],
})
export class AppModule {}
