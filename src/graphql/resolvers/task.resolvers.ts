import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Task } from "../models/task.model";
import { TasksService } from "src/tasks/tasks.service";
import { TaskInputDto } from "src/tasks/dto/task.input";
import { TaskUpdateDto } from "src/tasks/dto/task.update";

@Resolver(() => Task)
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
        @Args('taskInput') taskInput: TaskInputDto
    ): Promise<Task> {
        return this.tasksService.createTask(taskInput);
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
    deleteTask(
        @Args('id', { type: () => Int }) id: number
    ): Promise<Task> {
        return this.tasksService.deleteTask(id);
    }
}