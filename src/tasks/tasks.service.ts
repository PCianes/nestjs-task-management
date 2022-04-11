import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksStatus } from './task-status.enum';
import { createTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';

@Injectable()
export class TasksService {
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       ({ title, description }) =>
  //         title.toLowerCase().includes(search.toLowerCase()) ||
  //         description.toLowerCase().includes(search.toLowerCase()),
  //     );
  //   }
  //   return tasks;
  // }
  // getTaskById(id: string): Task {
  //   const found = this.tasks.find((task) => task.id === id);
  //   if (!found) throw new NotFoundException(`Task with ID "${id}" not found`);
  //   return found;
  // }
  // createTask(createTaskDto: createTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TasksStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // deleteTask(id: string): void {
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
  // }
  // updateTaskStatus(id: string, status: TasksStatus): Task {
  //   const task = this.getTaskById(id);
  //   //mutation because of temporal solution with tasks in memory
  //   task.status = status;
  //   return task;
  // }
}
