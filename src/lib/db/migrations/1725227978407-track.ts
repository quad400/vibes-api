import { MigrationInterface, QueryRunner } from "typeorm";

export class Track1725227978407 implements MigrationInterface {
    name = 'Track1725227978407'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tracks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "artist_id" character varying NOT NULL, "album_id" character varying NOT NULL, "image_url" character varying NOT NULL, "audio_url" character varying NOT NULL, "artistId" uuid, "albumId" uuid, CONSTRAINT "UQ_30f73369783dcb7e7bc57276503" UNIQUE ("title"), CONSTRAINT "PK_242a37ffc7870380f0e611986e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "albums" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "image_url" character varying NOT NULL, "artist_id" uuid, CONSTRAINT "UQ_2c85c318a6c245b0eecc2081952" UNIQUE ("title"), CONSTRAINT "PK_838ebae24d2e12082670ffc95d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."artists_genre_enum" AS ENUM('pop', 'rock', 'afrosounds', 'hip-hop', 'rnb', 'jazz', 'blues', 'other')`);
        await queryRunner.query(`ALTER TABLE "artists" ADD "genre" "public"."artists_genre_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "artist_id" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_72cbc00782363e68122820d2998" UNIQUE ("artist_id")`);
        await queryRunner.query(`ALTER TABLE "artists" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "artists" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "artists" ADD CONSTRAINT "UQ_b6ae1e521cfeccade55e889f3d7" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "tracks" ADD CONSTRAINT "FK_62f595181306916265849fced48" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tracks" ADD CONSTRAINT "FK_5c52e761792791f57de2fec342d" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "albums" ADD CONSTRAINT "FK_b6465bf462c2ffef5f066bc6f21" FOREIGN KEY ("artist_id") REFERENCES "artists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "artists" ADD CONSTRAINT "FK_b6ae1e521cfeccade55e889f3d7" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_72cbc00782363e68122820d2998" FOREIGN KEY ("artist_id") REFERENCES "artists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_72cbc00782363e68122820d2998"`);
        await queryRunner.query(`ALTER TABLE "artists" DROP CONSTRAINT "FK_b6ae1e521cfeccade55e889f3d7"`);
        await queryRunner.query(`ALTER TABLE "albums" DROP CONSTRAINT "FK_b6465bf462c2ffef5f066bc6f21"`);
        await queryRunner.query(`ALTER TABLE "tracks" DROP CONSTRAINT "FK_5c52e761792791f57de2fec342d"`);
        await queryRunner.query(`ALTER TABLE "tracks" DROP CONSTRAINT "FK_62f595181306916265849fced48"`);
        await queryRunner.query(`ALTER TABLE "artists" DROP CONSTRAINT "UQ_b6ae1e521cfeccade55e889f3d7"`);
        await queryRunner.query(`ALTER TABLE "artists" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "artists" ADD "user_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_72cbc00782363e68122820d2998"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "artist_id"`);
        await queryRunner.query(`ALTER TABLE "artists" DROP COLUMN "genre"`);
        await queryRunner.query(`DROP TYPE "public"."artists_genre_enum"`);
        await queryRunner.query(`DROP TABLE "albums"`);
        await queryRunner.query(`DROP TABLE "tracks"`);
    }

}
