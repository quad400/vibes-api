import { BaseEntity } from "src/lib/db/base-entity";
import { TrackEntity } from "src/res/track/entities/track.entity";
import { UserEntity } from "src/res/user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity("playlists")
export class PlaylistEntity extends BaseEntity{

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    title: string

    @Column({nullable: true, type: "varchar"})
    description: string

    @Column({nullable: true})
    image_url: string

    @Column({default: false})
    is_published: boolean

    @Column({default: false})
    is_deleted: boolean

    @ManyToOne(()=> UserEntity, (user)=> user.playlists)
    user: UserEntity

    @ManyToMany(()=> TrackEntity)
    @JoinTable({name: "playlist_tracks"})
    tracks: TrackEntity[]
}