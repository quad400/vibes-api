import { MigrationInterface, QueryRunner } from "typeorm";

export class TrackLike1725228289598 implements MigrationInterface {
    name = 'TrackLike1725228289598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "track_likes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "track_id" uuid, "user_id" uuid, CONSTRAINT "PK_81c79eef7d466e389e350c3bfbb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "track_likes" ADD CONSTRAINT "FK_dd02f6452b31db92c506c8c700c" FOREIGN KEY ("track_id") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track_likes" ADD CONSTRAINT "FK_ed8a6e6fde2685e5e37d21c1da8" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "track_likes" DROP CONSTRAINT "FK_ed8a6e6fde2685e5e37d21c1da8"`);
        await queryRunner.query(`ALTER TABLE "track_likes" DROP CONSTRAINT "FK_dd02f6452b31db92c506c8c700c"`);
        await queryRunner.query(`DROP TABLE "track_likes"`);
    }

}
