import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { CurrentUser } from '../user/decorator/current-user.decorator';
import { CreateArtistDto, UpdateArtistDto } from './dto/artist.dto';
import { UserEntity } from '../user/entities/user.entity';
import { QueryOptionsDto } from 'src/lib/common/utils/pagination';

@UseInterceptors(CacheInterceptor)
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post("create")
  async createArtist(@CurrentUser() user: UserEntity, @Body() data: CreateArtistDto) {
    return await this.artistService.createArtist(user.id, data);
  }

  @Patch("update")
  async updateArtist(@CurrentUser() user: UserEntity, @Body() data: UpdateArtistDto) {
    return await this.artistService.updateArtist(user.id, data);
  }

  @Get("get-artists")
  async getArtists(@Query() query: QueryOptionsDto){
    return await this.artistService.getArtists(query)
  }

  @Get(":artistId")
  async getArtist(@Param("artistId") artistId: string){
    return await this.artistService.getArtist(artistId)
  }

  @Delete("delete-artist-account")
  async deleteArtistAccount(@CurrentUser() user: UserEntity){
    return await this.artistService.deleteArtist(user.id)
  }

}
