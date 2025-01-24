import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTasksAndAttachmentsMigration1735368756240 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Table: users
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'username',
                        type: 'varchar',
                        length: '255',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '255',
                        isUnique: true,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        length: '255',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                    },
                ],
            })
        );

        // 2. Table: tasks
        await queryRunner.createTable(
            new Table({
                name: 'tasks',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        length: '255',
                    },
                    {
                        name: 'description',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'due_date',
                        type: 'date',
                    },
                    {
                        name: 'status',
                        type: 'enum',
                        enum: ['pending', 'in_progress', 'completed'],
                        default: "'pending'",
                    },
                    {
                        name: 'user_id',
                        type: 'int',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                    },
                ],
            })
        );

        // Foreign Key: tasks -> users
        await queryRunner.createForeignKey(
            'tasks',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        );

        // 3. Table: attachments
        await queryRunner.createTable(
            new Table({
                name: 'attachments',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'file_path',
                        type: 'varchar',
                        length: '255',
                    },
                    {
                        name: 'task_id',
                        type: 'int',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                    },
                ],
            })
        );

        // Foreign Key: attachments -> tasks
        await queryRunner.createForeignKey(
            'attachments',
            new TableForeignKey({
                columnNames: ['task_id'],
                referencedTableName: 'tasks',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop tables and foreign keys in reverse order
        await queryRunner.dropForeignKey('attachments', 'FK_attachments_task_id');
        await queryRunner.dropTable('attachments');

        await queryRunner.dropForeignKey('tasks', 'FK_tasks_user_id');
        await queryRunner.dropTable('tasks');

        await queryRunner.dropTable('users');
    }
}
