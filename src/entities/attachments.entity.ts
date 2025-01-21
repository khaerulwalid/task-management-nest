import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Task } from './tasks.entity';

@Entity('attachments')
export class Attachment {
    @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  fileName: string;

  @Column({ type: 'varchar', length: 255 })
  filePath: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  fileType: string;

  @ManyToOne(() => Task, task => task.id, { onDelete: 'CASCADE' })
  task: Task;
}
