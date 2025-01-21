import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/entities/tasks.entity';
import { TasksResolver } from 'src/graphql/resolvers/task.resolvers';
import { User } from 'src/entities/users.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

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
    })
  ],
  providers: [TasksService, TasksResolver, AuthGuard],
  exports: [TasksService],
})
export class TasksModule {}