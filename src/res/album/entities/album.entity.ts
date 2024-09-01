import { BaseEntity } from "src/lib/db/base-entity";
import { ArtistEntity } from "src/res/artist/entity/artist.entity";
import { TrackEntity } from "src/res/track/entities/track.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("albums")
export class AlbumEntity extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({unique: true})
    title: string

    @Column()
    image_url: string

    @ManyToOne(()=> ArtistEntity, (artist)=> artist.albums)
    @JoinColumn({name: "artist_id"})
    artist: ArtistEntity

    @OneToMany(()=> TrackEntity, (track)=> track.album)
    tracks: TrackEntity[]
}
