import { ConflictException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from './entity/artist.entity';
import { Not, Repository } from 'typeorm';
import { CreateArtistDto, UpdateArtistDto } from './dto/artist.dto';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { Response } from 'src/lib/common/utils/response';
import { UserRole } from 'src/lib/enums/user.enum';
import { PageDto, PageMetaDto, QueryOptionsDto } from 'src/lib/common/utils/pagination';

@Injectable()
export class ArtistService {

    constructor(
        @InjectRepository(ArtistEntity)
        private readonly artistRepository: Repository<ArtistEntity>,

        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly userService: UserService,
    ) { }

    async createArtist(userId: string, data: CreateArtistDto) {
        const existedArtist = await this.artistRepository.findOneBy({
            user:
            {
                id: userId
            }
        });
        if (existedArtist) {
            throw new ConflictException('Artist already exists');
        }

        const uniqueArtist = await this.artistRepository.findOne({ where: { stage_name: data.stage_name } });

        if (uniqueArtist) {
            throw new ConflictException(`${data.stage_name} already exists`);
        }

        const user = await this.userService.findById(userId);
        Object.assign(user,{ role: UserRole.ARTIST });

        await this.userRepository.save(user);
        const artist = this.artistRepository.create({ ...data, user });
        await this.artistRepository.save(artist);
        return Response.success(artist, 'Artist created successfully', HttpStatus.CREATED);
    }

    async updateArtist(userId: string, data: UpdateArtistDto) {

        const artist = await this.findByUserId(userId)
        const uniqueArtist = await this.artistRepository.findOne({ where: { stage_name: data.stage_name } });

        if (uniqueArtist) {
            throw new ConflictException(`${data.stage_name} already exists`);
        }

        Object.assign(data, artist)
        await this.artistRepository.save(artist)
        return Response.success(null, 'Artist updated successfully', HttpStatus.OK);
    }
    
    async getArtist(artistId: string) {
        const artist = await this.artistRepository.findOne({where: {id: artistId}, relations: ["user"]})
        if(!artist){
            throw new NotFoundException("Artist not found")
        }
        return Response.success(artist, 'Artist get successfully', HttpStatus.OK);
    }
    
    async deleteArtist(userId: string){
        const artist = await this.findByUserId(userId)
        const user = await this.userService.findById(userId);
        Object.assign(user,{ role: UserRole.LISTENER });
        await this.userRepository.save(user);

        await this.artistRepository.remove(artist)
        return Response.success(null, 'Artist Account deleted successfully', HttpStatus.OK);
    }
    
    async getArtists(query: QueryOptionsDto){
        const {limit, keywords, page} = query

        const skip = (page - 1) * limit

        const queryBuilder = this.artistRepository
            .createQueryBuilder("artist")
            .leftJoinAndSelect("artist.user", "user")

        if(keywords){
            queryBuilder.andWhere("artist.stage_name ILIKE :keywords", {
                keywords: `%${keywords}%`
            })
        }

        queryBuilder.orderBy("artist.created_at").skip(skip).take(limit)

        const itemCount = await queryBuilder.getCount()
        const artists = await queryBuilder.getMany()

        const pageMetaDto = new PageMetaDto({
            itemCount,
            queryOptionsDto: query,
          });
      
          const pagedto = new PageDto(artists, pageMetaDto);

          return Response.success(pagedto, "Artists get Successfully", HttpStatus.OK)
    }
    
    async findByUserId(user_id: string) {
        const artist = await this.artistRepository.findOneBy({
            user:
            {
                id: user_id
            }
        });

        if (!artist) {
            throw new NotFoundException('Artist not found');
        }
        return artist
    }

}
