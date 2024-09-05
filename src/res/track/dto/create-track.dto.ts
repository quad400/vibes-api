import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  image_url: string;

  @IsString()
  @IsNotEmpty()
  audio_url: string;

  @IsUUID()
  @IsNotEmpty()
  album_id: string;
}

export class GetArtistTrackPlaysDto {
  @IsUUID()
  @IsNotEmpty()
  artistId: string;
}
