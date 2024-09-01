import { MigrationInterface, QueryRunner } from "typeorm";

export class TrackUpdated1725228547579 implements MigrationInterface {
    name = 'TrackUpdated1725228547579'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tracks" DROP COLUMN "artist_id"`);
        await queryRunner.query(`ALTER TABLE "tracks" DROP COLUMN "album_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tracks" ADD "album_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tracks" ADD "artist_id" character varying NOT NULL`);
    }

}
