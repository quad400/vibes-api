import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsOptional, IsString, IsUrl, IsUUID } from "class-validator";

export class CreatePlaylistDto{
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsOptional()
    description?: string

    @IsUrl()
    @IsOptional()
    image_url?: string
}

export class UpdatePlaylistDto extends PartialType(CreatePlaylistDto){}

export class AddTrackPlaylistDto{
    @IsUUID()
    @IsNotEmpty()
    trackId: string
}