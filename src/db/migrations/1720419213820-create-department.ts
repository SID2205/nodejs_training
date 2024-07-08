import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDepartment1720419213820 implements MigrationInterface {
    name = 'CreateDepartment1720419213820'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_5da431839230368631d3decfe6d"`);
        await queryRunner.query(`ALTER TABLE "department" DROP CONSTRAINT "PK_adfcbd0999c4fb2354d4f86700d"`);
        await queryRunner.query(`ALTER TABLE "department" ADD CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "department_id"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "department_department_id"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_678a3540f843823784b0fe4a4f2" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_678a3540f843823784b0fe4a4f2"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "department_department_id" integer`);
        await queryRunner.query(`ALTER TABLE "department" ADD "department_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "department" DROP CONSTRAINT "PK_9a2213262c1593bffb581e382f5"`);
        await queryRunner.query(`ALTER TABLE "department" ADD CONSTRAINT "PK_adfcbd0999c4fb2354d4f86700d" PRIMARY KEY ("id", "department_id")`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_5da431839230368631d3decfe6d" FOREIGN KEY ("department_id", "department_department_id") REFERENCES "department"("id","department_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
