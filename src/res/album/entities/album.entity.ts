import { BaseEntity } from 'src/lib/db/base-entity';
import { ArtistEntity } from 'src/res/artist/entity/artist.entity';
import { TrackEntity } from 'src/res/track/entities/track.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AlbumLikeEntity } from './album-like.entity';

@Entity('albums')
export class AlbumEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  title: string;

  @Column({
    default:
      'https://res.cloudinary.com/dupox1iqn/image/upload/v1725275626/tv7o1nyoapzmlzc17ace.jpg',
  })
  image_url: string;

  @Column({nullable: true})
  description: string;

  @Column({ default: false })
  is_deleted: boolean;

  @ManyToOne(() => ArtistEntity, (artist) => artist.albums)
  @JoinColumn({ name: 'artist_id' })
  artist: ArtistEntity;

  @OneToMany(() => AlbumLikeEntity, (album_like) => album_like.album)
  likes: AlbumLikeEntity[];
  
  @OneToMany(() => TrackEntity, (track) => track.album)
  tracks: TrackEntity[];
}
