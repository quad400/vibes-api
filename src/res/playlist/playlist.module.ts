import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { TrackEntity } from '../track/entities/track.entity';
import { UserEntity } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { FollowEntity } from '../user/entities/user-follow.entity';
import { TrackService } from '../track/track.service';
import { PlaylistEntity } from './entities/playlist.entity';
import { TrackLikeEntity } from '../track/entities/track-like.entity';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { AlbumEntity } from '../album/entities/album.entity';
import { AlbumLikeEntity } from '../album/entities/album-like.entity';
import { ArtistEntity } from '../artist/entity/artist.entity';
import { BullModule } from '@nestjs/bull';
import { Config } from 'src/lib/config';
import { PlayEntity } from '../track/entities/play.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TrackEntity,
      UserEntity,
      FollowEntity,
      PlaylistEntity,
      TrackLikeEntity,
      AlbumEntity,
      AlbumLikeEntity,
      ArtistEntity,
      PlayEntity
    ]),
    BullModule.registerQueue({
      name: Config.TRACK_PLAY_QUEUE,
    }),
  ],
  controllers: [PlaylistController],
  providers: [
    PlaylistService,
    UserService,
    TrackService,
    AlbumService,
    ArtistService,
  ],
})
export class PlaylistModule {}
