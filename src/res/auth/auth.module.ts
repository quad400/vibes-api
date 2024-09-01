import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserEntity } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { Config } from 'src/lib/config';
import { SendMailConsumer } from './consumer/send-email.consumer';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), 
  BullModule.registerQueue({
    name: Config.CREATE_USER_QUEUE
  }),
  JwtModule.register({
    secret: Config.JWT_SECRET,
    global: true,
    signOptions: { expiresIn: Config.JWT_EXPIRES_IN },
  }),

  ],
  controllers: [AuthController],
  providers: [AuthService,SendMailConsumer]
})
export class AuthModule {}
