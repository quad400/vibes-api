import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Config } from 'src/lib/config';
import { TrackService } from '../track.service';
import { UserService } from 'src/res/user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayEntity } from '../entities/play.entity';
import { Repository } from 'typeorm';

@Processor(Config.TRACK_PLAY_QUEUE)
export class TrackPlayConsumer {
  constructor(
    @InjectRepository(PlayEntity)
    private readonly playRepository: Repository<PlayEntity>,

    private readonly trackService: TrackService,
    private readonly userService: UserService,
  ) {}

  @Process()
  async transcode(job: Job<unknown>) {
    const trackId = job.data['trackId'];
    const userId = job.data['userId'];

    const user = await this.userService.findById(userId);
    const track = await this.trackService.findById(trackId);
    const play = this.playRepository.create({ user, track });
    await this.playRepository.save(play);
  }
}
