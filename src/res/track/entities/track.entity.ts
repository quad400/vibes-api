import { AlbumEntity } from 'src/res/album/entities/album.entity';
import { ArtistEntity } from 'src/res/artist/entity/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TrackLikeEntity } from './track-like.entity';
import { BaseEntity } from 'src/lib/db/base-entity';
import { PlaylistEntity } from 'src/res/playlist/entities/playlist.entity';
import { PlayEntity } from 'src/res/track/entities/play.entity';

@Entity('tracks')
export class TrackEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  title: string;

  @Column()
  image_url: string;

  @Column()
  audio_url: string;

  @Column({ default: false })
  is_deleted: boolean;

  @Column({ name: 'album_id' })
  album_id: string;

  @ManyToOne(() => ArtistEntity, (artist) => artist.id, {
    onDelete: 'CASCADE',
    eager: true,
  })
  artist: ArtistEntity;

  @ManyToMany(() => PlaylistEntity, (playlist) => playlist.tracks)
  playlists: PlaylistEntity[];

  @ManyToOne(() => AlbumEntity, (album) => album.id, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'album_id' })
  album: AlbumEntity;

  @OneToMany(() => TrackLikeEntity, (trackLike) => trackLike.user, {
    eager: false,
  })
  likes: TrackLikeEntity[];

  @OneToMany(() => PlayEntity, (play) => play.track)
  plays: PlayEntity[];
}
