import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/album.dto';
import { AlbumEntity } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistService } from '../artist/artist.service';
import { Response } from 'src/lib/common/utils/response';
import {
  PageDto,
  PageMetaDto,
  QueryOptionsDto,
} from 'src/lib/common/utils/pagination';
import { AlbumLikeEntity } from './entities/album-like.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
    
    @InjectRepository(AlbumLikeEntity)
    private readonly albumLikeRepository: Repository<AlbumLikeEntity>,

    private readonly artistService: ArtistService,
  ) {}

  async addAlbum(userId: string, data: CreateAlbumDto) {
    const artist = await this.artistService.findByUserId(userId);
    await this.uniqueAlbum(data.title);

    const album = this.albumRepository.create({
      ...data,
      artist: artist,
    });

    await this.albumRepository.save(album);
    return Response.success(
      null,
      'Album created successfully',
      HttpStatus.CREATED,
    );
  }

  async updateAlbum(userId: string, albumId: string, data: UpdateAlbumDto) {
    const artist = await this.artistService.findByUserId(userId);
    console.log(artist)
    const album = await this.albumRepository.findOne({
      where: {
        id: albumId,
        artist: {
          id: artist.id,
        },
      },
    });
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    await this.albumRepository.update(albumId, data);
    return Response.success(null, 'Album updated successfully', HttpStatus.OK);
  }

  async getAlbum(albumId: string) {
    const album = await this.albumRepository.findOne({
      where: { id: albumId },
      relations: ['tracks'],
    });
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return Response.success(
      album,
      'Album retrieved successfully',
      HttpStatus.OK,
    );
  }

  async getAllAlbums(query: QueryOptionsDto) {
    const { limit, keywords, page } = query;

    const skip = (page - 1) * limit;

    const queryBuilder = this.albumRepository
      .createQueryBuilder('album')
      .leftJoinAndSelect('album.tracks', 'tracks');

    if (keywords) {
      queryBuilder.andWhere('album.title ILIKE :keywords', {
        keywords: `%${keywords}%`,
      });
    }

    queryBuilder.orderBy('album.created_at').skip(skip).take(limit);

    const itemCount = await queryBuilder.getCount();
    const artists = await queryBuilder.getMany();

    const pageMetaDto = new PageMetaDto({
      itemCount,
      queryOptionsDto: query,
    });

    const result = new PageDto(artists, pageMetaDto);

    return Response.success(
      result,
      'Album retrieved Successfully',
      HttpStatus.OK,
    );
  }

  async likeUnLikeAlbum(userId: string, albumId: string) {
    const existingLike = await this.albumLikeRepository.findOne({
      where: {
        user: { id: userId },
        album: { id: albumId },
      }
    })

    if(existingLike){
      await this.albumLikeRepository.delete(existingLike.id);
      return Response.success(null, "Album unliked successfully", HttpStatus.OK)
    }else{
      const user = await this.artistService.findByUserId(userId);

      const album = await this.albumRepository.findOneBy({id: albumId});
      if(!album){
        throw new NotFoundException("Album not found")
      }
      const newLike = this.albumLikeRepository.create({user, album});
      await this.albumLikeRepository.save(newLike);
      return Response.success(null, "Album liked successfully", HttpStatus.OK)
    }
  }

  async deleteAlbum(userId: string, albumId: string) {
    const artist = await this.artistService.findByUserId(userId);
    const album = await this.albumRepository.findOne({
      where: { id: albumId, artist: artist },
    });
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    await this.albumRepository.update(albumId, { is_deleted: true });
    return Response.success(null, 'Album deleted successfully', HttpStatus.OK);
  }

  async uniqueAlbum(title: string) {
    const album = await this.albumRepository.findOne({ where: { title } });
    if (album) {
      throw new ConflictException(`${title} already exists`);
    }
  }
}
