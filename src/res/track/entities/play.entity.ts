import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../user/entities/user.entity";
import { TrackEntity } from "src/res/track/entities/track.entity";


@Entity("play")
export class PlayEntity{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @ManyToOne(()=> UserEntity, (user)=>user.plays, {onDelete: "CASCADE"})
    user: UserEntity

    @ManyToOne(()=> TrackEntity, (track)=> track.plays)
    track: TrackEntity

    @CreateDateColumn()
    played_at: Date
}