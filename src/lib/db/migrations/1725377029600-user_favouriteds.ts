import { MigrationInterface, QueryRunner } from "typeorm";

export class UserFavouriteds1725377029600 implements MigrationInterface {
    name = 'UserFavouriteds1725377029600'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_favorite_tracks" ("usersId" uuid NOT NULL, "tracksId" uuid NOT NULL, CONSTRAINT "PK_b7e1d5617c8b501b5ff6d7b35dc" PRIMARY KEY ("usersId", "tracksId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_be3c5c442441555c2b8d1ddcac" ON "user_favorite_tracks" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e194b90aa443676a984938f86a" ON "user_favorite_tracks" ("tracksId") `);
        await queryRunner.query(`CREATE TABLE "user_favorite_albums" ("usersId" uuid NOT NULL, "albumsId" uuid NOT NULL, CONSTRAINT "PK_b4a9156c3cd1a7ffac87a569cfb" PRIMARY KEY ("usersId", "albumsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3b4be65d0abdd1ee3f3b5d47ab" ON "user_favorite_albums" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_43215bb656dc4b1134b2785123" ON "user_favorite_albums" ("albumsId") `);
        await queryRunner.query(`ALTER TABLE "user_favorite_tracks" ADD CONSTRAINT "FK_be3c5c442441555c2b8d1ddcac5" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_favorite_tracks" ADD CONSTRAINT "FK_e194b90aa443676a984938f86ab" FOREIGN KEY ("tracksId") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_favorite_albums" ADD CONSTRAINT "FK_3b4be65d0abdd1ee3f3b5d47ab1" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_favorite_albums" ADD CONSTRAINT "FK_43215bb656dc4b1134b27851237" FOREIGN KEY ("albumsId") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_favorite_albums" DROP CONSTRAINT "FK_43215bb656dc4b1134b27851237"`);
        await queryRunner.query(`ALTER TABLE "user_favorite_albums" DROP CONSTRAINT "FK_3b4be65d0abdd1ee3f3b5d47ab1"`);
        await queryRunner.query(`ALTER TABLE "user_favorite_tracks" DROP CONSTRAINT "FK_e194b90aa443676a984938f86ab"`);
        await queryRunner.query(`ALTER TABLE "user_favorite_tracks" DROP CONSTRAINT "FK_be3c5c442441555c2b8d1ddcac5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_43215bb656dc4b1134b2785123"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3b4be65d0abdd1ee3f3b5d47ab"`);
        await queryRunner.query(`DROP TABLE "user_favorite_albums"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e194b90aa443676a984938f86a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_be3c5c442441555c2b8d1ddcac"`);
        await queryRunner.query(`DROP TABLE "user_favorite_tracks"`);
    }

}
