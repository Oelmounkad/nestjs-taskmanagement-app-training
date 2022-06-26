import { Task, TaskStatus } from './task.model';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks : Task[] = [];

  getAllTasks() : Task[] {
    return this.tasks;
  }

  getTaskById(id: string) : Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto) : Task {
    const { title, description } = createTaskDto;
    const newTask : Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN
    }
    this.tasks.push(newTask);
    return newTask;
  }

  deleteTaskById(id: string) : Task {
    const taskToDelete = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return taskToDelete;
  }

  updateTaskStatusById(id: string, status: TaskStatus): void {
    this.tasks.find((task) => task.id === id).status = status;
  }


}
