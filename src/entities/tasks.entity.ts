import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './users.entity';
import { Attachment } from './attachments.entity';
import { BaseEntity } from './base.entity';

@Entity('tasks')
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'date' })
  due_date: string;

  @Column({ type: 'enum', enum: ['pending', 'in_progress', 'completed'], default: 'pending' })
  status: string;

  @Column({ type: 'int', nullable: true })
  user_id: number;

  // Relasi ManyToOne dengan User
  @ManyToOne(() => User, user => user.tasks, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Relasi OneToMany dengan Attachment
  @OneToMany(() => Attachment, attachment => attachment.task)
  attachments: Attachment[];
}
