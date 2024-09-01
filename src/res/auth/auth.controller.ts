import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ChangePasswordDto, CreateUserDto, LoginUserDto, RegenrateOtpDto, VerifyUserDto } from './dto/auth.dto';
import { Public } from './strategy/public.strategy';

@Public()
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post('register')
    async register(@Body() data: CreateUserDto) {
        return await this.authService.create(data)
    }

    @Post('login')
    async login(@Body() data: LoginUserDto) {
        return await this.authService.login(data)
    }

    @Post('verify')
    async verify(@Body() data: VerifyUserDto) {
        return await this.authService.verify(data)
    }

    @Post('resend-otp')
    async regenerate(@Body() data: RegenrateOtpDto) {
        return await this.authService.regenerate(data)
    }

    @Post("change-password")
    async changePassword(@Body() data: ChangePasswordDto){
        return await this.authService.changePassword(data);
    }
}
