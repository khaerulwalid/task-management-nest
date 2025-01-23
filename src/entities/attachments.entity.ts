import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Task } from './tasks.entity';
import { BaseEntity } from './base.entity';

@Entity('attachments')
export class Attachment extends BaseEntity {
    @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  file_path: string;

  @Column()
  task_id: number;

  @ManyToOne(() => Task, task => task.id, { onDelete: 'CASCADE' })
  task: Task;
}
