import { BaseEntity } from "src/lib/db/base-entity";
import { AlbumEntity } from "src/res/album/entities/album.entity";
import { GenreEnum } from "src/res/album/enum/genre.enum";
import { TrackEntity } from "src/res/track/entities/track.entity";
import { UserEntity } from "src/res/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("artists")
export class ArtistEntity extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({unique: true})
    stage_name: string

    @Column({nullable: true})
    bio: string

    @Column({type: "enum", enum:GenreEnum})
    genre: GenreEnum

    @OneToOne(()=> UserEntity, (user)=> user.artist, {eager: true})
    @JoinColumn({name: "user_id"})
    user: UserEntity

    @OneToMany(()=> AlbumEntity, (album)=> album.artist)
    albums: AlbumEntity[]

    @OneToMany(()=> TrackEntity, (track)=> track.artist) 
    tracks: TrackEntity[]
 }