import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateStatsTable1613431336738 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'stats',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'doer',
            type: 'varchar',
          },
          {
            name: 'test_id',
            type: 'uuid',
          },
          {
            name: 'total',
            type: 'integer',
          },
          {
            name: 'hits',
            type: 'integer',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      'stats',
      new TableForeignKey({
        name: 'StatQuestion',
        columnNames: ['test_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tests',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('stats', 'StatQuestion');
    await queryRunner.dropTable('stats');
  }
}
