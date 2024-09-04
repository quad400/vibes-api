import { MigrationInterface, QueryRunner } from "typeorm";

export class Track_albumId1725329053735 implements MigrationInterface {
    name = 'Track_albumId1725329053735'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tracks" DROP CONSTRAINT "FK_5c52e761792791f57de2fec342d"`);
        await queryRunner.query(`ALTER TABLE "tracks" RENAME COLUMN "albumId" TO "album_id"`);
        await queryRunner.query(`ALTER TABLE "tracks" ALTER COLUMN "album_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tracks" ADD CONSTRAINT "FK_fceb1d9483fda6a312af244a80e" FOREIGN KEY ("album_id") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tracks" DROP CONSTRAINT "FK_fceb1d9483fda6a312af244a80e"`);
        await queryRunner.query(`ALTER TABLE "tracks" ALTER COLUMN "album_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tracks" RENAME COLUMN "album_id" TO "albumId"`);
        await queryRunner.query(`ALTER TABLE "tracks" ADD CONSTRAINT "FK_5c52e761792791f57de2fec342d" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
