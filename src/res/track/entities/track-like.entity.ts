import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TrackEntity } from "./track.entity";
import { UserEntity } from "src/res/user/entities/user.entity";

@Entity("track_likes")
export class TrackLikeEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @ManyToOne(()=> TrackEntity, (track)=> track.id, {onDelete: "CASCADE"})
    @JoinColumn({name: "track_id"})
    track: TrackEntity
    
    @ManyToOne(()=> UserEntity, (user)=> user.id, {onDelete: "CASCADE"})
    @JoinColumn({name: "user_id"})
    user: UserEntity
}