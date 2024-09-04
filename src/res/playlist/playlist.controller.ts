import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CurrentUser } from '../user/decorator/current-user.decorator';
import { UserEntity } from '../user/entities/user.entity';
import {
  AddTrackPlaylistDto,
  CreatePlaylistDto,
  UpdatePlaylistDto,
} from './dto/playlist.dto';
import { QueryOptionsDto } from 'src/lib/common/utils/pagination';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post('create-new-playlist')
  async createNewPlaylist(
    @CurrentUser() user: UserEntity,
    @Body() data: CreatePlaylistDto,
  ) {
    return await this.playlistService.createNewPlaylist(user.id, data);
  }

  @Get('get-all-playlists')
  async getAllPlaylist(@Query() query: QueryOptionsDto) {
    return await this.playlistService.getAllPlaylist(query);
  }

  @Put('publish-playlist/:playlistId')
  async publishPlaylist(
    @CurrentUser() user: UserEntity,
    @Param("playlistId") playlistId: string,
  ) {
    return await this.playlistService.publishPlaylist(user.id, playlistId);
  }
  @Get('get-playlist/:playlistId')
  async getPlaylist(@Param("playlistId") playlistId: string) {
    return await this.playlistService.getPlaylist(playlistId);
  }

  @Get('get-user-playlists')
  async getUserPlaylists(@CurrentUser() user: UserEntity) {
    return await this.playlistService.getUserPlaylists(user.id);
  }

  @Patch('update-playlist/:playlistId')
  async updatePlaylist(
    @CurrentUser() user: UserEntity,
    @Param('playlistId') playlistId: string,
    @Body() data: UpdatePlaylistDto,
  ) {
    return await this.playlistService.updatePlaylist(user.id, playlistId, data);
  }

  @Put('update-playlist/:playlistId/add-remove-track')
  async addRemoveTrackPlaylist(
    @CurrentUser() user: UserEntity,
    @Param('playlistId') playlistId: string,
    @Body() data: AddTrackPlaylistDto,
  ) {
    return await this.playlistService.addRemoveTrackPlaylist(
      user.id,
      playlistId,
      data,
    );
  }

  @Delete('remove-playlist/:playlistId')
  async removePlaylist(
    @CurrentUser() user: UserEntity,
    @Param('playlistId') playlistId: string,
  ) {
    return await this.playlistService.removePlaylist(user.id, playlistId);
  }
}
