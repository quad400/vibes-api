import { BaseEntity } from "src/lib/db/base-entity";
import { UserRole } from "src/lib/enums/user.enum";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, Repository } from "typeorm";
import { FollowEntity } from "./user-follow.entity";
import { ArtistEntity } from "src/res/artist/entity/artist.entity";
import { TrackLikeEntity } from "src/res/track/entities/track-like.entity";

@Entity("users")
export class UserEntity extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string

    @Column({unique: true,nullable: true})
    username: string

    @Column({unique: true})
    email: string

    @Column({enum: UserRole, default: UserRole.LISTENER})
    role: UserRole

    @Column({select: false})
    password: string
    
    @Column({
        default: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg"
    })
    avatar: string

    @Column({nullable: true, select: false})
    otp_expired_date: Date

    @Column({nullable: true, select: false})
    otp_code: string

    
    @Column({type: "jsonb", nullable: true})
    socials: object
    
    @Column({default: false})
    is_deleted: boolean
    
    @Column({default: false})
    is_verified: boolean
    
    @OneToOne(()=> ArtistEntity, (artist)=> artist.user)
    @JoinColumn({name: "artist_id"})
    artist: ArtistEntity

    @OneToMany(()=> FollowEntity, (follow)=> follow.following)
    followings: FollowEntity[]

    @OneToMany(()=> FollowEntity, (follow)=> follow.follower)
    followers: FollowEntity[]

    @OneToMany(()=> TrackLikeEntity, (likes)=> likes.user)
    track_likes: TrackLikeEntity[]
}
