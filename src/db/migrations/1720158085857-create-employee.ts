import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEmployee1720158085857 implements MigrationInterface {
    name = 'CreateEmployee1720158085857'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_7e77f562043393b08de949b804b"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "password" character varying`);
        await queryRunner.query(`ALTER TABLE "address" ADD "role" character varying`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "password" character varying`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "role" character varying`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_7e77f562043393b08de949b804b" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_7e77f562043393b08de949b804b"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_7e77f562043393b08de949b804b" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
