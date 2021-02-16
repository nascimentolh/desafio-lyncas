import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import User from '../../../../modules/users/infra/typeorm/entities/User';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          name: 'Administrador',
          email: 'admin',
          password:
            '$2a$08$bBHRuVaTjtYaShwYzvjtregAl9aLpBKUAw//hzt6PAy2ueqwPDVeS',
        },
      ])
      .execute();
  }
}
