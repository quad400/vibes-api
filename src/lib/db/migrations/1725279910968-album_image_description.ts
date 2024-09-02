import { MigrationInterface, QueryRunner } from "typeorm";

export class AlbumImageDescription1725279910968 implements MigrationInterface {
    name = 'AlbumImageDescription1725279910968'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "albums" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "albums" ADD "is_deleted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "albums" ALTER COLUMN "image_url" SET DEFAULT 'https://res.cloudinary.com/dupox1iqn/image/upload/v1725275626/tv7o1nyoapzmlzc17ace.jpg'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "albums" ALTER COLUMN "image_url" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "albums" DROP COLUMN "is_deleted"`);
        await queryRunner.query(`ALTER TABLE "albums" DROP COLUMN "description"`);
    }

}
