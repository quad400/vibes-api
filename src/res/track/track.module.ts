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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TrackEntity,
      TrackLikeEntity,
      AlbumEntity,
      ArtistEntity,
      AlbumLikeEntity,
      UserEntity,
      FollowEntity
    ]),
  ],
  exports: [TrackService],
  controllers: [TrackController],
  providers: [TrackService, AlbumService, ArtistService, UserService],
})
export class TrackModule {}
