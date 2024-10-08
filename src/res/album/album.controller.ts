import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/album.dto';
import { CurrentUser } from '../user/decorator/current-user.decorator';
import { UserEntity } from '../user/entities/user.entity';
import { QueryOptionsDto } from 'src/lib/common/utils/pagination';
import { CacheInterceptor } from '@nestjs/cache-manager';


@UseInterceptors(CacheInterceptor)
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post('add-album')
  async addAlbum(
    @CurrentUser() user: UserEntity,
    @Body() createAlbumDto: CreateAlbumDto,
  ) {
    return await this.albumService.addAlbum(user.id, createAlbumDto);
  }

  @Get('get-all-albums')
  async getAllAlbums(@Query() query: QueryOptionsDto) {
    return await this.albumService.getAllAlbums(query);
  }

  @Patch('update-album/:albumId')
  async updateAlbum(
    @CurrentUser() user: UserEntity,
    @Param('albumId') albumId: string,
    @Body() data: UpdateAlbumDto,
  ) {
    return await this.albumService.updateAlbum(user.id, albumId, data);
  }

  @Get('get-album/:albumId')
  async getAlbum(@Param('albumId') albumId: string) {
    return await this.albumService.getAlbum(albumId);
  }

  @Get('get-album-likes/:albumId')
  async getAlbumLikes(@Param('albumId') albumId: string) {
    return await this.albumService.getAlbumLikes(albumId);
  }

  @Put('like-unlike-album/:albumId')
  async likeUnlikeAlbum(
    @CurrentUser() user: UserEntity,
    @Param('albumId') albumId: string,
  ) {
    return await this.albumService.likeUnLikeAlbum(user.id, albumId);
  }

  @Put('add-remove-favourite-album/:albumId')
  async addRemoveFavouriteAlbum(
    @CurrentUser() user: UserEntity,
    @Param('albumId') albumId: string,
  ) {
    return await this.albumService.addRemoveFavouriteAlbum(user.id, albumId);
  }

  @Delete('delete-album/:albumId')
  async deleteAlbum(
    @CurrentUser() user: UserEntity,
    @Param('albumId') albumId: string,
  ) {
    return await this.albumService.deleteAlbum(user.id, albumId);
  }
}
