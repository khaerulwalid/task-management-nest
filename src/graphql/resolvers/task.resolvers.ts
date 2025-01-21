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

    // Query to get all tasks created by user, optionally filtered by status or due date
    @Query(returns => [Task])
    async getTasks(
        @Args('filterByStatus', { type: () => String, nullable: true }) filterByStatus?: string,
        @Args('filterByDueDate', { type: () => String, nullable: true }) filterByDueDate?: string
    ): Promise<Task[]> {
        try {
            console.log("<<Masuk Resolver");
        
            return this.tasksService.getTasks(filterByStatus, filterByDueDate);
        } catch (error) {
            console.log(error, "<<Error Resolvers");
            
        }
    }

    // Query to get task details by task ID
    @Query(returns => Task)
    async getTaskDetail(
        @Args('id', { type: () => Int }) id: number
    ): Promise<Task> {
        return this.tasksService.getTaskDetail(id);
    }

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
        @Args('taskInput') taskInput: TaskUpdateDto
    ): Promise<Task> {
        return this.tasksService.updateTask(id, taskInput);
    }

    // Mutation to delete a task by ID
    @Mutation(returns => Task)
    async deleteTask(
        @Args('id', { type: () => Int }) id: number
    ): Promise<Task> {
        const task = await this.tasksService.deleteTask(id);

        return task;
    }
}