import { MigrationInterface, QueryRunner } from "typeorm";

export class LikeChanges1725283433320 implements MigrationInterface {
    name = 'LikeChanges1725283433320'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "album_likes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "album_id" uuid, "user_id" uuid, CONSTRAINT "PK_cc85a60d847440a6b308143c735" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "album_likes" ADD CONSTRAINT "FK_a1ffdab2c973f0b2e6c4b41beac" FOREIGN KEY ("album_id") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "album_likes" ADD CONSTRAINT "FK_0b26b50c15a8dd171c2dde2571f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "album_likes" DROP CONSTRAINT "FK_0b26b50c15a8dd171c2dde2571f"`);
        await queryRunner.query(`ALTER TABLE "album_likes" DROP CONSTRAINT "FK_a1ffdab2c973f0b2e6c4b41beac"`);
        await queryRunner.query(`DROP TABLE "album_likes"`);
    }

}
