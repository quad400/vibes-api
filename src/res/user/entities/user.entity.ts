import { BaseEntity } from 'src/lib/db/base-entity';
import { UserRole } from 'src/lib/enums/user.enum';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
import { FollowEntity } from './user-follow.entity';
import { ArtistEntity } from 'src/res/artist/entity/artist.entity';
import { TrackLikeEntity } from 'src/res/track/entities/track-like.entity';
import { AlbumLikeEntity } from 'src/res/album/entities/album-like.entity';
import { TrackEntity } from 'src/res/track/entities/track.entity';
import { AlbumEntity } from 'src/res/album/entities/album.entity';
import { PlaylistEntity } from 'src/res/playlist/entities/playlist.entity';
import { PlayEntity } from '../../track/entities/play.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true, nullable: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ enum: UserRole, default: UserRole.LISTENER })
  role: UserRole;

  @Column({ select: false })
  password: string;

  @Column({
    default:
      'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg',
  })
  avatar: string;

  @Column({ nullable: true, select: false })
  otp_expired_date: Date;

  @Column({ nullable: true, select: false })
  otp_code: string;

  @Column({ type: 'jsonb', nullable: true })
  socials: object;

  @Column({ default: false })
  is_deleted: boolean;

  @Column({ default: false })
  is_verified: boolean;

  @OneToOne(() => ArtistEntity, (artist) => artist.user)
  @JoinColumn({ name: 'artist_id' })
  artist: ArtistEntity;

  @OneToMany(() => FollowEntity, (follow) => follow.following, { eager: false })
  followings: FollowEntity[];

  @OneToMany(() => FollowEntity, (follow) => follow.follower, { eager: false })
  followers: FollowEntity[];

  @OneToMany(() => PlaylistEntity, (playlist) => playlist.user)
  playlists: PlaylistEntity[];

  @ManyToMany(() => TrackEntity)
  @JoinTable({
    name: 'user_favorite_tracks',
  })
  favorite_tracks: TrackEntity[];

  @ManyToMany(() => AlbumEntity)
  @JoinTable({
    name: 'user_favorite_albums',
  })
  favorite_albums: AlbumEntity[];

  @OneToMany(()=> PlayEntity, (play)=> play.user)
  plays: PlayEntity[]
}
