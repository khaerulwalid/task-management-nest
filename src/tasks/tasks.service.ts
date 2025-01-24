import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Task } from 'src/entities/tasks.entity';
import { TaskInputDto } from './dto/task.input';
import { TaskUpdateDto } from './dto/task.update';
import { GraphqlException } from 'src/common/graphql.exception';
import { User } from 'src/entities/users.entity';
import { UserValidationService } from 'src/common/validation/user-validation.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userValidationService: UserValidationService,
  ) {}

  async getTasks(filterByStatus?: string, filterByDueDate?: string, search?: string): Promise<Task[]> {
    
      const where: any = {};

      if (filterByStatus) where.status = filterByStatus;
      if (filterByDueDate) where.due_date = filterByDueDate;
      if (search) where.title = Like(`%${search}%`);
    try {
      const result = await this.taskRepository.find({
        where,
        relations: ['user'],
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getTaskDetail(id: number): Promise<Task> {
    try {
      const task = await this.taskRepository.findOne({
        where: {
          id
        },
        relations: ['user'],
      });

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

  async createTask(taskDto: TaskInputDto, userId: number): Promise<Task> {

    try {
      const user = await this.userValidationService.validateUserExists(userId);
      
      const task = this.taskRepository.create({
        ...taskDto,
        user: user,
      });

      return await this.taskRepository.save(task);
    } catch (error) {
      throw error;
    }
  }

  async updateTask(id: number, taskDto: TaskUpdateDto, userId: number): Promise<Task> {
    try {
      const task = await this.taskRepository.findOne({
        where: {
          id,
          user_id: userId,
        }
      });

      if (!task) {
        throw new GraphqlException(
          'Task not found or you are not authorized to update this task',
          'NotFoundException',
          HttpStatus.NOT_FOUND,
        );
      }

      Object.assign(task, taskDto);

      return await this.taskRepository.save(task);
    } catch (error) {
      throw error;
    }
  }

  async deleteTask(id: number, userId: number): Promise<Task> {
    
    try {
      const task = await this.taskRepository.findOne({
        where: {
          id,
          user_id: userId,
        }
      });

      if (!task) {
        throw new GraphqlException(
          'Task not found or you are not authorized to update this task',
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
