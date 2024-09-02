import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';
import { ArtistService } from '../artist/artist.service';
import { ArtistEntity } from '../artist/entity/artist.entity';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { FollowEntity } from '../user/entities/user-follow.entity';
import { AlbumLikeEntity } from './entities/album-like.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AlbumEntity,
      ArtistEntity,
      UserEntity,
      FollowEntity,
      AlbumLikeEntity,
    ]),
  ],
  controllers: [AlbumController],
  providers: [AlbumService, ArtistService, UserService],
})
export class AlbumModule {}
