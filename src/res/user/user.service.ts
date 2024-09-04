import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowUserDto, UpdateUserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';
import { Response } from 'src/lib/common/utils/response';
import { FollowEntity } from './entities/user-follow.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(FollowEntity)
    private readonly followRepository: Repository<FollowEntity>,
  ) {}

  async updateMe(data: UpdateUserDto, user: UserEntity) {
    Object.assign(user, data);
    const updatedUser = await this.userRepository.save(user);
    return Response.success(
      updatedUser,
      'User updated successfully',
      HttpStatus.OK,
    );
  }

  async getMe(userId: string) {
    const user = await this.findById(userId);
    return Response.success(user, 'User successfull get', HttpStatus.OK);
  }

  async followUnfollowUser(userId: string, followId: string) {
    const existingFollow = await this.followRepository.findOne({
      where: {
        follower: {
          id: userId,
        },
        following: {
          id: followId,
        },
      },
    });
    if (existingFollow) {
      await this.followRepository.delete(existingFollow.id);
      return Response.success(
        null,
        'User unfollowed successfully',
        HttpStatus.OK,
      );
    } else {
      const follower = await this.userRepository.findOneBy({ id: userId });
      const following = await this.userRepository.findOneBy({ id: followId });

      const newFollow = this.followRepository.create({ follower, following });
      await this.followRepository.save(newFollow);
      return Response.success(
        null,
        'User followed successfully',
        HttpStatus.OK,
      );
    }
  }

  async getFollowers(userId: string) {
    const followers = await this.followRepository.find({
      where: {
        following: {
          id: userId,
        },
      },
      relations: ['follower'],
    });
    return Response.success(
      followers,
      'Followers fetched successfully',
      HttpStatus.OK,
    );
  }

  async getFollowings(userId: string) {
    const followings = await this.followRepository.find({
      where: {
        follower: {
          id: userId,
        },
      },
      relations: ['following'],
    });
    return Response.success(
      followings,
      'Following fetched successfully',
      HttpStatus.OK,
    );
  }

  async findById(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['favorite_albums', 'favorite_tracks'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
