import { MigrationInterface, QueryRunner } from "typeorm";

export class Playlist1725382528251 implements MigrationInterface {
    name = 'Playlist1725382528251'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "playlists" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying, "image_url" character varying, "is_published" boolean NOT NULL DEFAULT false, "is_deleted" boolean NOT NULL DEFAULT false, "userId" uuid, CONSTRAINT "PK_a4597f4189a75d20507f3f7ef0d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "playlist_tracks" ("playlistsId" uuid NOT NULL, "tracksId" uuid NOT NULL, CONSTRAINT "PK_c35c07ec1d59f855f2b7328e107" PRIMARY KEY ("playlistsId", "tracksId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_099ecf5f4e50a1ab2be226388c" ON "playlist_tracks" ("playlistsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_312755aa5afad56f7260d05e7d" ON "playlist_tracks" ("tracksId") `);
        await queryRunner.query(`ALTER TABLE "playlists" ADD CONSTRAINT "FK_708a919e9aa49019000d9e9b68e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "playlist_tracks" ADD CONSTRAINT "FK_099ecf5f4e50a1ab2be226388ca" FOREIGN KEY ("playlistsId") REFERENCES "playlists"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "playlist_tracks" ADD CONSTRAINT "FK_312755aa5afad56f7260d05e7d8" FOREIGN KEY ("tracksId") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "playlist_tracks" DROP CONSTRAINT "FK_312755aa5afad56f7260d05e7d8"`);
        await queryRunner.query(`ALTER TABLE "playlist_tracks" DROP CONSTRAINT "FK_099ecf5f4e50a1ab2be226388ca"`);
        await queryRunner.query(`ALTER TABLE "playlists" DROP CONSTRAINT "FK_708a919e9aa49019000d9e9b68e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_312755aa5afad56f7260d05e7d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_099ecf5f4e50a1ab2be226388c"`);
        await queryRunner.query(`DROP TABLE "playlist_tracks"`);
        await queryRunner.query(`DROP TABLE "playlists"`);
    }

}
