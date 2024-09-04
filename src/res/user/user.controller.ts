import { Body, Controller, Get, Param, Patch, Put, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { FollowUserDto, UpdateUserDto } from "./dto/user.dto";
import { CurrentUser } from "./decorator/current-user.decorator";
import { UserEntity } from "./entities/user.entity";
import { CacheInterceptor } from "@nestjs/cache-manager";

@UseInterceptors(CacheInterceptor)
@Controller("user")
export class UserController{

    constructor(private userService: UserService){}
  
    @Patch("update")
    async updateMe(@Body() data: UpdateUserDto, @CurrentUser() user: UserEntity){
        return await this.userService.updateMe(data, user);
    }

    @Get("me")
    async getMe(@CurrentUser() user: UserEntity){
        return await this.userService.getMe(user.id)
    }

    @Get("profile/:userId")
    async getUserProfile(@Param("userId") userId: string){
        return await this.userService.getMe(userId)
    }

    @Put("follow-unfollow/:followId")
    async followUser(@CurrentUser() user: UserEntity, @Param("followId") followId: string){
        return await this.userService.followUnfollowUser(user.id, followId)
    }

    @Get("followers")
    async getFollowers(@CurrentUser() user: UserEntity){
        return await this.userService.getFollowers(user.id)
    }

    @Get("followings")
    async getFollowings(@CurrentUser() user: UserEntity){
        return await this.userService.getFollowings(user.id)
    }
}
