import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from './entities/track.entity';
import { TrackLikeEntity } from './entities/track-like.entity';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { AlbumEntity } from '../album/entities/album.entity';
import { AlbumLikeEntity } from '../album/entities/album-like.entity';
import { ArtistEntity } from '../artist/entity/artist.entity';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { FollowEntity } from '../user/entities/user-follow.entity';
import { BullModule } from '@nestjs/bull';
import { Config } from 'src/lib/config';
import { TrackPlayConsumer } from './consumer/play.consumer';
import { PlayEntity } from './entities/play.entity';
import { PlaylistEntity } from '../playlist/entities/playlist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TrackEntity,
      TrackLikeEntity,
      AlbumEntity,
      ArtistEntity,
      AlbumLikeEntity,
      UserEntity,
      FollowEntity,
      PlayEntity
    ]),
    BullModule.registerQueue({
      name: Config.TRACK_PLAY_QUEUE,
    }),
  ],
  controllers: [TrackController],
  providers: [
    TrackService,
    AlbumService,
    ArtistService,
    UserService,
    TrackPlayConsumer,
  ],
})
export class TrackModule {}
