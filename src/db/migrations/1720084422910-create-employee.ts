import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEmployee1720084422910 implements MigrationInterface {
    name = 'CreateEmployee1720084422910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ADD "age" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "age"`);
    }

}
