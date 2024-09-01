import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)    
    password: string;
}

export class LoginUserDto {
    
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(8)    
    password: string;
}


export class VerifyUserDto{
    
    @IsEnum({REGISTER:"REGISTER",RESET_PASSWORD: "RESET_PASSWORD"})
    @IsNotEmpty()
    type: "REGISTER" | "RESET_PASSWORD"
    
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(4)
    code: string;

}

export class RegenrateOtpDto{
    @IsEmail()
    @IsNotEmpty()
    email: string;
}

export class ChangePasswordDto{
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    confirm_password: string;
}