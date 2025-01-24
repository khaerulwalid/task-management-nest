import { Args, Context, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Task } from "../models/task.model";
import { TasksService } from "src/tasks/tasks.service";
import { TaskInputDto } from "src/tasks/dto/task.input";
import { TaskUpdateDto } from "src/tasks/dto/task.update";
import { CustomRequest } from "src/common/interface/request.interface";
import { Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";

@Resolver(() => Task)
@UseGuards(AuthGuard)
export class TasksResolver {
    constructor(private tasksService: TasksService) {}

    // Mutation to create a new task
    @Mutation(returns => Task)
    createTask(
        @Args('taskInput') taskInput: TaskInputDto,
        @Context() context: any
    ): Promise<Task> {
        const userId = context.req.user.id;
        console.log(userId, "<<userId");
        
        return this.tasksService.createTask(taskInput, userId);
    }

    // Mutation to update an existing task by ID
    @Mutation(returns => Task)
    updateTask(
        @Args('id', { type: () => Int }) id: number,
        @Args('taskUpdate') taskUpdate: TaskUpdateDto,
        @Context() context: any
    ): Promise<Task> {
        const userId = context.req.user.id;
        return this.tasksService.updateTask(id, taskUpdate, userId);
    }

    // Mutation to delete a task by ID
    @Mutation(returns => Task)
    async deleteTask(
        @Args('id', { type: () => Int }) id: number,
        @Context() context: any
    ): Promise<Task> {
        const userId = context.req.user.id;
        const task = await this.tasksService.deleteTask(id, userId);

        return task;
    }
}