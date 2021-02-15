import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTestsQuestionsRelationship1613164081556
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tests_questions_question',
        columns: [
          {
            name: 'testId',
            type: 'uuid',
          },
          {
            name: 'questionId',
            type: 'uuid',
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      'tests_questions_question',
      new TableForeignKey({
        name: 'TestQuestionsTest',
        columnNames: ['testId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tests',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'tests_questions_question',
      new TableForeignKey({
        name: 'TestQuestionsQuestion',
        columnNames: ['questionId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'questions',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('tests_questions_question', 'TestQuestionsTest');
    await queryRunner.dropForeignKey('tests_questions_question', 'TestQuestionsQuestion');
    await queryRunner.dropTable('tests_questions_question');
  }
}
