import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from 'src/entities/tasks.entity';
import { TaskInputDto } from './dto/task.input';
import { TaskUpdateDto } from './dto/task.update';
import { GraphqlException } from 'src/common/graphql.exception';
import { User } from 'src/entities/users.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(User)  // Menggunakan UserRepository
    private readonly userRepository: Repository<User>,
  ) {}

  // Mendapatkan semua tasks dengan filter opsional
  async getTasks(filterByStatus?: string, filterByDueDate?: string): Promise<Task[]> {
    try {
      const where: any = {};

      if (filterByStatus) {
        where.status = filterByStatus;
      }

      if (filterByDueDate) {
        where.due_date = filterByDueDate;
      }

      const result = await this.taskRepository.find({
        where,
        relations: ['user'],
      });
      console.log(result, "<<Result");
      
      return result;
    } catch (error) {
      console.log(error, "<<Error");
      throw error;
    }
  }

  // Mendapatkan task berdasarkan ID
  async getTaskDetail(id: number): Promise<Task> {
    try {
      const task = await this.taskRepository.findOne({ where: { id } });

      if (!task) {
        throw new GraphqlException(
            'Task not found',
            'NotFoundException',
            HttpStatus.NOT_FOUND,
        );
      }

      return task;
    } catch (error) {
      throw error;
    }
  }

  // Membuat task baru
  async createTask(taskDto: TaskInputDto, userId: number): Promise<Task> {
    try {
      // Validasi apakah user_id ada di tabel users
      const user = await this.userRepository.findOne({
        where: {
          id: userId,
        }
      });

      if (!user) {
        throw new GraphqlException(
          'User not found',
          'BadRequestException',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Normalisasi atau validasi data jika perlu
      const task = this.taskRepository.create({
        ...taskDto,
        user: user,
      });

      return await this.taskRepository.save(task);
    } catch (error) {
      throw error;
    }
  }

  // Mengupdate task yang sudah ada
  async updateTask(id: number, taskDto: TaskUpdateDto): Promise<Task> {
    try {
      const task = await this.taskRepository.findOne({ where: { id } });

      if (!task) {
        throw new GraphqlException(
          'Task not found',
          'NotFoundException',
          HttpStatus.NOT_FOUND,
        );
      }

      // Mengupdate task
      Object.assign(task, taskDto);

      return await this.taskRepository.save(task);
    } catch (error) {
      throw error;
    }
  }

  // Menghapus task berdasarkan ID
  async deleteTask(id: number): Promise<Task> {
    try {
      const task = await this.taskRepository.findOne({ where: { id } });

      if (!task) {
        throw new GraphqlException(
          'Task not found',
          'NotFoundException',
          HttpStatus.NOT_FOUND,
        );
      }

      await this.taskRepository.remove(task);
      return task;
    } catch (error) {
      throw error;
    }
  }
}
