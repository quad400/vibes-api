import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackEntity } from '../track/entities/track.entity';
import { Brackets, Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import {
  AddTrackPlaylistDto,
  CreatePlaylistDto,
  UpdatePlaylistDto,
} from './dto/playlist.dto';
import {
  PageDto,
  PageMetaDto,
  QueryOptionsDto,
} from 'src/lib/common/utils/pagination';
import { PlaylistEntity } from './entities/playlist.entity';
import { Response } from 'src/lib/common/utils/response';
import { TrackService } from '../track/track.service';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(PlaylistEntity)
    private readonly playlistRepository: Repository<PlaylistEntity>,
    private readonly trackService: TrackService,
    private readonly userService: UserService,
  ) {}

  async createNewPlaylist(userId: string, data: CreatePlaylistDto) {
    const user = await this.userService.findById(userId);
    const playlist = this.playlistRepository.create({ ...data, user });

    await this.playlistRepository.save(playlist);
    return Response.success(
      null,
      'Playlist Created Successfully',
      HttpStatus.CREATED,
    );
  }

  async getAllPlaylist(query: QueryOptionsDto) {
    const { limit, keywords, page } = query;

    const skip = (page - 1) * limit;

    const queryBuilder = this.playlistRepository
      .createQueryBuilder('playlist')
      .where('playlist.is_deleted = :is_deleted', { is_deleted: false })
      .where('playlist.is_published = :is_published', { is_published: true })
      .leftJoinAndSelect('playlist.user', 'user')
      .leftJoinAndSelect('playlist.tracks', 'tracks');

    if (keywords) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('playlist.title ILIKE :keywords', {
            keywords: `%${keywords}%`,
          }).orWhere('user.username ILIKE :keywords', {
            keywords: `%${keywords}%`,
          });
        }),
      );
    }

    queryBuilder.orderBy('playlist.created_at').skip(skip).take(limit);

    const itemCount = await queryBuilder.getCount();
    const playlists = await queryBuilder.getMany();

    const pageMetaDto = new PageMetaDto({
      itemCount,
      queryOptionsDto: query,
    });

    const result = new PageDto(playlists, pageMetaDto);

    return Response.success(
      result,
      'Playlists retrieved Successfully',
      HttpStatus.OK,
    );
  }
  
  async publishPlaylist(userId: string, playlistId: string){
    const playlist = await this.findById(playlistId, userId)
    Object.assign(playlist, {is_published: true})
    
    await this.playlistRepository.save(playlist)
    return Response.success(
      null,
      'Playlists published Successfully',
      HttpStatus.OK,
    );
  }

  async getPlaylist(playlistId: string) {
    const playlist = await this.findById(playlistId);

    return Response.success(
      playlist,
      'Playlist retrieved Successfully',
      HttpStatus.OK,
    );
    return Response.success(
      playlist,
      'Playlist retrieved Successfully',
      HttpStatus.OK,
    );
  }

  async getUserPlaylists(userId: string) {
    const playlists = await this.playlistRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ["tracks"]
    });
    return Response.success(
      playlists,
      'Playlists retrieved Successfully',
      HttpStatus.OK,
    );
  }

  async updatePlaylist(
    userId: string,
    playlistId: string,
    data: UpdatePlaylistDto,
  ) {
    const playlist = await this.findById(playlistId, userId);

    Object.assign(playlist, data);
    await this.playlistRepository.save(playlist);
    return Response.success(
      null,
      'Playlist Updated Successfully',
      HttpStatus.OK,
    );
  }

  async removePlaylist(userId: string, playlistId: string) {
    const playlist = await this.findById(playlistId, userId);

    playlist.is_deleted = true;
    await this.playlistRepository.save(playlist);
    return Response.success(
      null,
      'Playlist Deleted Successfully',
      HttpStatus.OK,
    );
  }

  async addRemoveTrackPlaylist(
    userId: string,
    playlistId: string,
    data: AddTrackPlaylistDto,
  ) {
    const playlist = await this.findById(playlistId, userId);
    const track = await this.trackService.findById(data.trackId);

    
    const isPlaylistTrack = playlist.tracks.some(
      (playlist_track) => playlist_track.id === data.trackId,
    );
    if (isPlaylistTrack) {
      playlist.tracks = playlist.tracks.filter(
        (track) => track.id !== data.trackId,
      );
      await this.playlistRepository.save(playlist);
      return Response.success(
        null,
        `Track with title '${track.title}' removed from playlist Successfully`,
      );
    } else {
      playlist.tracks.push(track);
      await this.playlistRepository.save(playlist);
      return Response.success(
        null,
        `Track with title '${track.title}' added to playlist Successfully`,
      );
    }
  }

  async findById(playlistId: string, userId?: string) {
    const playlist = await this.playlistRepository.findOne({
      where: {
        id: playlistId,
        user: {
          id: userId,
        },
        is_deleted: false,
      },
      relations: ['user', "tracks"],
    });

    if (!playlist) {
      throw new NotFoundException(`Playlist with ${playlistId} not found`);
    }

    return playlist;
  }
}
