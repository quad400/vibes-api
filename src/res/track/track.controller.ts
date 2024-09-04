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
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { CurrentUser } from '../user/decorator/current-user.decorator';
import { UserEntity } from '../user/entities/user.entity';
import { QueryOptionsDto } from 'src/lib/common/utils/pagination';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post('add-track')
  async addNewTrack(
    @CurrentUser() user: UserEntity,
    @Body() data: CreateTrackDto,
  ) {
    return await this.trackService.addNewTrack(user.id, data);
  }

  @Get('get-all-tracks')
  async getAllTracks(@Query() query: QueryOptionsDto) {
    return await this.trackService.getAllTracks(query);
  }

  @Patch('update-track/:trackId')
  async updateTrack(
    @CurrentUser() user: UserEntity,
    @Param('trackId') trackId: string,
    @Body() data: UpdateTrackDto,
  ) {
    return await this.trackService.updateTrack(user.id, trackId, data);
  }

  @Get('get-track/:trackId')
  async getTrack(@Param('trackId') trackId: string) {
    return await this.trackService.getTrack(trackId);
  }

  @Get('get-track-likes/:trackId')
  async getAlbumLikes(@Param('trackId') trackId: string) {
    return await this.trackService.getTrackLikes(trackId);
  }

  @Put('like-unlike-track/:trackId')
  async likeUnlikeAlbum(
    @CurrentUser() user: UserEntity,
    @Param('trackId') trackId: string,
  ) {
    return await this.trackService.likeUnLikeTrack(user.id, trackId);
  }
  
  @Put('add-remove-favourite-track/:trackId')
  async addRemoveFavouriteTrack(
    @CurrentUser() user: UserEntity,
    @Param('trackId') trackId: string,
  ) {
    return await this.trackService.addRemoveFavouriteTrack(user.id, trackId);
  }


  @Delete('delete-track/:trackId')
  async deleteTrack(
    @CurrentUser() user: UserEntity,
    @Param('trackId') trackId: string,
  ) {
    return await this.trackService.deleteTrack(user.id, trackId);
  }
}
