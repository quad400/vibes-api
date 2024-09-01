import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistEntity } from './entity/artist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { FollowEntity } from '../user/entities/user-follow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity, UserEntity, FollowEntity])],
  controllers: [ArtistController],
  providers: [ArtistService, UserService],
})
export class ArtistModule {}
