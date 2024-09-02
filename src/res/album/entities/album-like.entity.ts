import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AlbumEntity } from "./album.entity";
import { UserEntity } from "src/res/user/entities/user.entity";


@Entity("album_likes")
export class AlbumLikeEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @ManyToOne(()=> AlbumEntity, (album)=> album.id, {onDelete: "CASCADE"})
    @JoinColumn({name: "album_id"})
    album: AlbumEntity

    @ManyToOne(()=> UserEntity, (user)=> user.id,{onDelete: "CASCADE"})
    @JoinColumn({name: "user_id"})
    user: UserEntity
}