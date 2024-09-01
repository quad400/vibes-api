import { PartialType } from "@nestjs/mapped-types"
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { GenreEnum } from "src/res/album/enum/genre.enum"


export class CreateArtistDto {
    @IsString()
    @IsNotEmpty()
    stage_name: string
    
    @IsString()
    @IsOptional()
    bio?: string

    @IsEnum(GenreEnum)
    @IsNotEmpty()
    genre: GenreEnum
}

export class UpdateArtistDto extends PartialType(CreateArtistDto){}