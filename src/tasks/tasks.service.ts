import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from 'src/entities/tasks.entity';
import { TaskInputDto } from './dto/task.input';
import { TaskUpdateDto } from './dto/task.update';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
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

      return await this.taskRepository.find({ where });
    } catch (error) {
      console.log(error, "<<Error");
      
      throw new HttpException(
        {
          message: 'Error retrieving tasks',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Mendapatkan task berdasarkan ID
  async getTaskDetail(id: number): Promise<Task> {
    try {
      const task = await this.taskRepository.findOne({ where: { id } });

      if (!task) {
        throw new HttpException({
          message: 'Task not found',
          error: 'NotFoundException',
        }, HttpStatus.NOT_FOUND);
      }

      return task;
    } catch (error) {
      throw new HttpException({
        message: 'Error retrieving task details',
        error: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Membuat task baru
  async createTask(taskDto: TaskInputDto): Promise<Task> {
    try {
      // Normalisasi atau validasi data jika perlu
      const task = this.taskRepository.create(taskDto);

      return await this.taskRepository.save(task);
    } catch (error) {
      console.log(error, "<<Error Create");
      
      throw new HttpException({
        message: 'Error creating task',
        error: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Mengupdate task yang sudah ada
  async updateTask(id: number, taskDto: TaskUpdateDto): Promise<Task> {
    try {
      const task = await this.taskRepository.findOne({ where: { id } });

      if (!task) {
        throw new HttpException({
          message: 'Task not found',
          error: 'NotFoundException',
        }, HttpStatus.NOT_FOUND);
      }

      // Mengupdate task
      Object.assign(task, taskDto);

      return await this.taskRepository.save(task);
    } catch (error) {
      throw new HttpException({
        message: 'Error updating task',
        error: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Menghapus task berdasarkan ID
  async deleteTask(id: number): Promise<Task> {
    try {
      const task = await this.taskRepository.findOne({ where: { id } });

      if (!task) {
        throw new HttpException({
          message: 'Task not found',
          error: 'NotFoundException',
        }, HttpStatus.NOT_FOUND);
      }

      await this.taskRepository.remove(task);
      return task;
    } catch (error) {
      throw new HttpException({
        message: 'Error deleting task',
        error: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
