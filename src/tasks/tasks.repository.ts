import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { TasksStatus } from './task-status.enum';
import { createTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { User } from 'src/auth/user.entity';

//TODO: update typeorm -> https://github.com/nestjs/typeorm/pull/1233
@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    //* only user's tasks
    query.where({ user });

    if (status) {
      query.andWhere('task.status = :data', { data: status });
    }

    if (search) {
      query.andWhere(
        //!all this query inside () to avoid problems in the final result of all "wheres"
        // because of the OR as final statment can return other user's tasks that match with search
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();

    return tasks;
  }

  async createTask(createTaskDto: createTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TasksStatus.OPEN,
      user,
    });

    await this.save(task);

    return task;
  }
}
