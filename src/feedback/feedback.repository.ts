import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { FeedbackDTO } from './DTO/feedback.dto';
import { Feedback } from './feedback.entity';


@EntityRepository(Feedback)
export class FeedbackRepository extends Repository<Feedback> {
  async register(feedbackDTO: FeedbackDTO, campaign): Promise<void> {
    const {  feedback, names,phone,location } = feedbackDTO;
    const feedbackData = this.create({
      names,
      campaign:campaign,
      phone,
      feedback,
      location,
    });
    try {
      console.log(feedbackData);
      await this.save(feedbackData);
    } catch (error) {
      console.log(error);

      if (error.code === '23505') {
        // duplicate campaign name
        console.log(error);
        throw new ConflictException('Feedback name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async edit(feedbackDTO: FeedbackDTO,  id,campaign): Promise<void> {
    const { names, feedback,phone ,location} = feedbackDTO;
    const feedbackData = this.create({
      names,
      campaign:campaign,
      phone,
      feedback,     
      location,
    });
    try {
      await this.update({ id }, feedbackData);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate samething
        console.log(error);
        throw new ConflictException('same thing name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
