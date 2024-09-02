import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateAlbumDto {

    @IsString()
    @IsNotEmpty()
    title: string;
    
    @IsString()
    @IsNotEmpty()
    description: string;
    
    @IsUrl()
    @IsNotEmpty()
    image_url: string;
}

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {}