import { Args, Context, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Task } from "../models/task.model";
import { TasksService } from "src/tasks/tasks.service";
import { TaskInputDto } from "src/tasks/dto/task.input";
import { TaskUpdateDto } from "src/tasks/dto/task.update";
import { CustomRequest } from "src/common/interface/request.interface";
import { Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";

@Resolver(() => Task)
export class GetTasksResolver {
    constructor(private tasksService: TasksService) {}

    @Query(returns => [Task])
    async getTasks(
        @Args('filterByStatus', { type: () => String, nullable: true }) filterByStatus?: string,
        @Args('filterByDueDate', { type: () => String, nullable: true }) filterByDueDate?: string,
        @Args('search', { type: () => String, nullable: true }) search?: string,
    ): Promise<Task[]> {
        try {
        
            return this.tasksService.getTasks(filterByStatus, filterByDueDate, search);
        } catch (error) {
            throw error;
        }
    }

    // Query to get task details by task ID
    @Query(returns => Task)
    async getTaskDetail(
        @Args('id', { type: () => Int }) id: number
    ): Promise<Task> {
        return this.tasksService.getTaskDetail(id);
    }


}