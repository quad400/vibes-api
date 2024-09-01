import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";


@Entity("follows")
export class FollowEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => UserEntity, (user) => user.followings)
    @JoinColumn({name: "follower_id"})
    follower: UserEntity

    @ManyToOne(() => UserEntity, (user) => user.followers)
    @JoinColumn({name: "following_id"})
    following: UserEntity

 }