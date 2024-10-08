import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto, GetArtistTrackPlaysDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackEntity } from './entities/track.entity';
import { Brackets, Repository } from 'typeorm';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { Response } from 'src/lib/common/utils/response';
import {
  PageDto,
  PageMetaDto,
  QueryOptionsDto,
} from 'src/lib/common/utils/pagination';
import { TrackLikeEntity } from './entities/track-like.entity';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { InjectQueue } from '@nestjs/bull';
import { Config } from 'src/lib/config';
import { Queue } from 'bull';
import { PlayEntity } from './entities/play.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,

    @InjectRepository(TrackLikeEntity)
    private readonly trackLikeRepository: Repository<TrackLikeEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(PlayEntity)
    private readonly playTrackRepository: Repository<PlayEntity>,

    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
    private readonly userService: UserService,

    @InjectQueue(Config.TRACK_PLAY_QUEUE)
    private readonly trackPlayQueue: Queue,
  ) {}

  async addNewTrack(userId: string, data: CreateTrackDto) {
    const artist = await this.artistService.findByUserId(userId);
    const album = await this.albumService.findById(data.album_id);
    await this.uniqueTrack(data.title);

    const track = this.trackRepository.create({ ...data, artist, album });
    await this.trackRepository.save(track);

    return Response.success(
      null,
      'Track created successfuly',
      HttpStatus.CREATED,
    );
  }

  async updateTrack(userId: string, trackId: string, data: UpdateTrackDto) {
    const track = await this.findById(trackId, userId);

    if (data.album_id) {
      await this.albumService.findById(data.album_id);
    }

    await this.uniqueTrack(data.title);

    await this.trackRepository.update(track.id, data);

    return Response.success(null, 'Track updated successfuly', HttpStatus.OK);
  }

  async getTrack(userId: string, trackId: string) {
    await this.trackPlayQueue.add(
      { trackId, userId },
      { removeOnComplete: true, removeOnFail: true, timeout: 1000 },
    );
    const track = await this.findById(trackId);
    return Response.success(
      track,
      'Track retrieved successfully',
      HttpStatus.OK,
    );
  }

  async getAllTracks(query: QueryOptionsDto) {
    const { limit, keywords, page } = query;

    const skip = (page - 1) * limit;

    const queryBuilder = this.trackRepository
      .createQueryBuilder('track')
      .leftJoinAndSelect('track.likes', 'likes')
      .loadRelationCountAndMap(`track.likeCount`, `track.likes`)
      .where('track.is_deleted = :is_deleted', { is_deleted: false })
      .leftJoinAndSelect('track.artist', 'artist')
      .leftJoinAndSelect('artist.user', 'user')
      .leftJoinAndSelect('track.album', 'album');

    if (keywords) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('track.title ILIKE :keywords', { keywords: `%${keywords}%` })
            .orWhere('album.title ILIKE :keywords', {
              keywords: `%${keywords}%`,
            })
            .orWhere('artist.stage_name ILIKE :keywords', {
              keywords: `%${keywords}%`,
            })
            .orWhere('user.username ILIKE :keywords', {
              keywords: `%${keywords}%`,
            });
        }),
      );
    }

    queryBuilder.orderBy('track.created_at').skip(skip).take(limit);

    const itemCount = await queryBuilder.getCount();
    const tracks = await queryBuilder.getMany();

    const pageMetaDto = new PageMetaDto({
      itemCount,
      queryOptionsDto: query,
    });

    const result = new PageDto(tracks, pageMetaDto);

    return Response.success(
      result,
      'Tracks retrieved Successfully',
      HttpStatus.OK,
    );
  }

  async likeUnLikeTrack(userId: string, trackId: string) {
    const existingLike = await this.trackLikeRepository.findOne({
      where: {
        user: { id: userId },
        track: { id: trackId },
      },
    });
    const track = await this.findById(trackId);
    console.log(track);
    if (existingLike) {
      track.likes.filter((track_like) => track_like.id !== existingLike.id);
      await this.trackRepository.save(track);
      await this.trackLikeRepository.delete(existingLike.id);
      return Response.success(
        null,
        'Track unliked successfully',
        HttpStatus.OK,
      );
    } else {
      let newLike = this.trackLikeRepository.create({
        user: { id: userId },
        track: { id: track.id },
      });
      newLike = await this.trackLikeRepository.save(newLike);

      await this.trackRepository.save(track);
      track.likes.push(newLike);
      return Response.success(null, 'Track liked successfully', HttpStatus.OK);
    }
  }

  async addRemoveFavouriteTrack(userId: string, trackId: string) {
    const user = await this.userService.findById(userId);
    const track = await this.findById(trackId);

    const isFavorite = user.favorite_tracks.some(
      (favoriteTracks) => favoriteTracks.id === trackId,
    );

    if (isFavorite) {
      user.favorite_tracks = user.favorite_tracks.filter(
        (track) => track.id !== trackId,
      );
      await this.userRepository.save(user);
      return Response.success(null, 'Track removed from favourite succesfully');
    } else {
      user.favorite_tracks.push(track);
      await this.userRepository.save(user);
      return Response.success(null, 'Track added to favourite succesfully');
    }
  }

  async getTrackLikes(trackId: string) {
    const track = await this.trackLikeRepository.find({
      where: {
        track: { id: trackId, is_deleted: false },
      },
      relations: ['user'],
    });

    return Response.success(
      track,
      'Track likes retrieved successfully',
      HttpStatus.OK,
    );
  }

  async getTrackPlays(trackId: string) {
    const playTracks = await this.playTrackRepository.find({
      where: {
        track: {
          id: trackId,
        },
      },
    });

    return Response.success(
      playTracks,
      'Track Plays retrieved Successfully',
      HttpStatus.OK,
    );
  }

  async getArtistTrackPlays(query: GetArtistTrackPlaysDto) {
    const { artistId } = query;
    const artist = await this.artistService.findById(artistId);
    const trackPlays = await this.playTrackRepository.findBy({
      track: {
        artist: {
          id: artist.id,
        },
      },
    });

    return Response.success(
      trackPlays,
      'Artist Tracks Plays count retrieved Successfully',
      HttpStatus.OK,
    );
  }

  async deleteTrack(userId: string, trackId: string) {
    const track = await this.findById(trackId, userId);
    const deletedTrack = Object.assign(track, { is_deleted: true });
    await this.trackRepository.save(deletedTrack);
    return Response.success(null, 'Track deleted successfully', HttpStatus.OK);
  }

  async findById(id: string, userId?: string) {
    const track = await this.trackRepository.findOne({
      where: {
        id,
        artist: {
          user: {
            id: userId,
          },
        },
        is_deleted: false,
      },
      relations: ['artist', 'album', 'artist.user'],
    });

    if (!track) {
      throw new NotFoundException(`Track with ${id} not found`);
    }

    return track;
  }

  async uniqueTrack(title: string) {
    const track = await this.trackRepository.findOne({ where: { title } });
    if (track) {
      throw new ConflictException(`${title} already exists`);
    }
  }
}
