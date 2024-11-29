import { inject, Injectable, signal } from "@angular/core";
import { Task, TaskStatus } from "./tasks/task.model";
import { LoggingService } from "./logging.service";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks = signal<Task[]>([]);

  allTasks = this.tasks.asReadonly()

  private loggingService = inject(LoggingService)
  addTask(taskData: { title: string; description: string }) {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(),
      status: 'OPEN',
    }
    this.tasks.update((oldTasks) => [...oldTasks, newTask])
    this.loggingService.log("ADDED TASK WITH TITLE" + taskData.title)
  }

  updateTaskStatus(taskId: string, status: TaskStatus) {
    this.tasks.update((oldTasks) => oldTasks.map((task) => task.id === taskId ? { ...task, status: status } : task))
    this.loggingService.log("CHANGE TASK STATUS TO " + status)
  }

}
