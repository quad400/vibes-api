import { AlbumEntity } from "src/res/album/entities/album.entity";
import { ArtistEntity } from "src/res/artist/entity/artist.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TrackLikeEntity } from "./track-like.entity";

@Entity("tracks")
export class TrackEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({unique: true})
    title: string

    @Column()
    image_url: string

    @Column()
    audio_url: string

    @ManyToOne(()=> ArtistEntity, (artist)=> artist.id, {onDelete: "CASCADE", eager: true})
    artist: ArtistEntity

    @ManyToOne(()=> AlbumEntity , (album)=> album.id, {onDelete: "CASCADE", eager: true})
    album: AlbumEntity

    @OneToMany(()=> TrackLikeEntity, (trackLike)=> trackLike.user)
    likes: TrackLikeEntity[]
}
