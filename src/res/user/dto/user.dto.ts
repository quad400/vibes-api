import { IsEmail, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString} from "class-validator";
import { UserRole } from "src/lib/enums/user.enum";


export class UpdateUserDto {
    @IsString()
    @IsOptional()
    name?: string;
    
    @IsString()
    @IsOptional()
    avatar?: string;
    
    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;
    
    @IsObject()
    @IsOptional()
    socials?: object;
    
    @IsEmail()
    @IsOptional()
    email?: object;
    
    @IsString()
    @IsOptional()
    username?: object;
}

export class FollowUserDto{

    @IsEnum({follow: "FOLLOW", unfollow: "UNFOLLOW"})
    type: "FOLLOW" | "UNFOLLOW"

    @IsString()
    @IsNotEmpty()
    followId: string
}