import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { UsersSeed } from "../seed/UsersSeeds";

export class SeedUser1613163028718 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await getRepository("users").save(UsersSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // do nothing
    }

}
