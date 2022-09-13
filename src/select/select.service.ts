import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { CandidateService } from 'src/candidate/candidate.service';
import { CriterialService } from 'src/criterial/criterial.service';
import { MailService } from 'src/mail/mail.service';
import { ScholorshipService } from 'src/scholorship/scholorship.service';
import { Connection, createQueryBuilder } from 'typeorm';
import { SelectDTO } from './DTO/select.dto';
import { SelectRepository } from './select.repository';

@Injectable()
export class SelectService {
  constructor(
    @InjectRepository(SelectRepository)
    private selectRepository: SelectRepository,
    private scholorshipService: ScholorshipService,
    private criterialService: CriterialService,
    private candidateService: CandidateService,
    private mailService: MailService,

    @InjectConnection() private readonly connection: Connection,
  ) {}

  async register(selectDTO: SelectDTO, user): Promise<void> {
    const { scholorshipId, date, time,emailMessage } = selectDTO;

    const scholorship = await this.scholorshipService.read(scholorshipId);
    // const criterial=await this.sc
    const id = scholorship.id;

    const query = ` select  (SELECT uuid_in(md5(random()::text || random()::text)::cstring))as id, s2.id as scholorship_id,c.id as candidate_id from candidates c ,scholorship s2 ,criterial c3 where c.combination_id =c3.combination_id and c.program_id =c3.program_id and s2.id='${scholorshipId}' and c3.scholorship_id='${scholorshipId}' and c.marks between c3.marks_from and c3.marks_to;`;
    const result = await this.connection.query(query);
    // .innerJoin("user.photos", "photo")
    // .where("user.name = :name", { name: "Timber" })
    // .getOne();
    for (var key in result) {
      var scholorship_id = result[key]['scholorship_id'];
      var candidate_id = result[key]['candidate_id'];
      console.log(candidate_id);

      await this.selectRepository.registerSelectedCandidate(
        scholorship_id,
        candidate_id,
        user.id,
      );
      const candidate = await this.candidateService.read(candidate_id);
      const scholorship = await this.scholorshipService.read(scholorship_id);

      await this.mailService.inviteCandidateInInterview(
        candidate.email,
        scholorship.names,
        candidate.names,
        emailMessage,
        date,
        time,
      );
      // ...
    }
    return result;
  }

  //   async show() {
  //     return await this.feedbackRepository.find({ relations: ['campaign'] });
  //   }
  async showScholorshipCandidate(scholorship_id) {
    return await this.selectRepository.find({
      where: { scholorship_id: scholorship_id },
    });
  }

  async read(id: string) {
    return await this.selectRepository.findOne({
      where: { id: id },
    });
  }

  async edit(selectDTO: SelectDTO, id) {
    const select = this.selectRepository.edit(selectDTO, id);
    return select;
  }
}
