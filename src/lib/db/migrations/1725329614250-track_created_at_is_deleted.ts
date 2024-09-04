import { MigrationInterface, QueryRunner } from "typeorm";

export class TrackCreatedAtIsDeleted1725329614250 implements MigrationInterface {
    name = 'TrackCreatedAtIsDeleted1725329614250'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tracks" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tracks" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tracks" ADD "is_deleted" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tracks" DROP COLUMN "is_deleted"`);
        await queryRunner.query(`ALTER TABLE "tracks" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "tracks" DROP COLUMN "created_at"`);
    }

}
