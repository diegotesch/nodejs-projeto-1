import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterProviderFieldsToProviderId1623078876315
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('agendamentos', 'provider');
    await queryRunner.addColumn(
      'agendamentos',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'agendamentos',
      new TableForeignKey({
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'usuarios',
        name: 'AgendamentoUsuario',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('agendamentos', 'AgendamentoUsuario');

    await queryRunner.dropColumn('agendamentos', 'provider_id');

    await queryRunner.addColumn(
      'agendamentos',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}
