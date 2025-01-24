import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/entities/tasks.entity';
import { TasksResolver } from 'src/graphql/resolvers/task.resolvers';
import { User } from 'src/entities/users.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { GetTasksResolver } from 'src/graphql/resolvers/get-task.resolvers';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, User]),
    ConfigModule.forRoot(),
        JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: { expiresIn: '1h' },
          }),
    }),
    AuthModule
  ],
  providers: [TasksService, TasksResolver, AuthGuard, GetTasksResolver],
  exports: [TasksService],
})
export class TasksModule {}