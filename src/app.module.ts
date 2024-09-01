import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './res/user/user.module';
import { AuthModule } from './res/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { dataSourceOptions } from './lib/db/data-source';
import { Config } from './lib/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './res/auth/guard/auth.guard';
import {redisStore} from 'cache-manager-redis-yet';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ArtistModule } from './res/artist/artist.module';
import { AlbumModule } from './res/album/album.module';
import { TrackModule } from './res/track/track.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    BullModule.forRoot({
      redis: {
        host: Config.REDIS_HOST,
        port: Config.REDIS_PORT,
      },
    }),
    RedisModule.forRootAsync({
      useFactory: () => ({  
        type: "single",
      url: Config.REDIS_URL,
    }),
  }),
  
  CacheModule.register({
    isGlobal: true,
    store: redisStore,
    url: Config.REDIS_URL,
    ttl: 300,
    }),
    UserModule, AuthModule, ArtistModule, AlbumModule, TrackModule],
    controllers: [AppController],
    providers: [AppService, 
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
