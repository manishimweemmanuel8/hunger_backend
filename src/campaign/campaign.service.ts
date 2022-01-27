import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CampaignRepository } from './campaign.repository';
import { CampaignDTO } from './DTO/campaign.dto';
import { ImageDTO } from './DTO/image.dto';

@Injectable()
export class CampaignService {
  constructor(
    @InjectRepository(CampaignRepository)
    private campaignRepository: CampaignRepository,
    private cloudinary: CloudinaryService,
  ) {}

  async register(campaignDTO: CampaignDTO, user): Promise<void> {
    return this.campaignRepository.register(campaignDTO, user);
  }

  async show() {
    return await this.campaignRepository.find({ relations: ['user'] });
  }

  async showByDistrict(user) {
    return await this.campaignRepository.findOne({
      relations: ['user'],
      where: { user: user },
    });
  }

  async showByDistrictActiveCampaign(user) {
    const status = true;
    return await this.campaignRepository.findOne({
      relations: ['user'],
      where: { user: user, status: status },
    });
  }

  async showByDistrictInactiveCampaign(user) {
    const status = false;
    return await this.campaignRepository.findOne({
      relations: ['user'],
      where: { user: user, status: status },
    });
  }

  async read(id: string) {
    return await this.campaignRepository.findOne({
      relations: ['user'],
      where: { id: id },
    });
  }

  async edit(campaignDTO: CampaignDTO, user, id): Promise<void> {
    return this.campaignRepository.edit(campaignDTO, user, id);
  }

  async updateImage(data: ImageDTO) {
    const { id, image } = data;
    const campaign = await this.read(id);

    campaign.image = image;

    await this.campaignRepository.save(campaign);

    return campaign;
  }

  async uploadImageToCloudinary(file: Express.Multer.File, id: string) {
    const picture = await this.cloudinary.uploadImage(file).catch(() => {
      // console.log(file);
      throw new BadRequestException('Invalid file type.');
    });
    const data = {
      id: id,
      image: picture.secure_url,
    };
    console.log(data);

    await this.updateImage(data);

    return picture;
  }

  async readImage(image: string):Promise<string>  {
    const campaign = await this.campaignRepository.findOne({
      relations: ['user'],
      where: { image: image },
    });
    return campaign.image;
  }
}
