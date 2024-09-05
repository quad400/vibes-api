import { MigrationInterface, QueryRunner } from "typeorm";

export class Play1725435391347 implements MigrationInterface {
    name = 'Play1725435391347'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "play" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "played_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "trackId" uuid, CONSTRAINT "PK_78bc0ac5050cc1068217341a73e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "play" ADD CONSTRAINT "FK_6663695b4c2f927cd31ce0ff543" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "play" ADD CONSTRAINT "FK_2dd8493498f8923f045208d8c51" FOREIGN KEY ("trackId") REFERENCES "tracks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "play" DROP CONSTRAINT "FK_2dd8493498f8923f045208d8c51"`);
        await queryRunner.query(`ALTER TABLE "play" DROP CONSTRAINT "FK_6663695b4c2f927cd31ce0ff543"`);
        await queryRunner.query(`DROP TABLE "play"`);
    }

}
