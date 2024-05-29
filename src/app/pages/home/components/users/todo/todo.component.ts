import { Component } from '@angular/core';
import { TaskService } from './todo.service';

export interface Task {
  title: string
  description: string 
  done: boolean 
  owner?: string // optional 
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  tasks: Task[] = []

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.taskService.getTasks().subscribe(
      (tasks) => {
        this.tasks = tasks;
      },
      (error) => {
        console.error('Erro ao buscar tarefas:', error);
      }
    );
  }

  toogleDone(tasks: Task) {
    tasks.done = !tasks.done
  }
}
