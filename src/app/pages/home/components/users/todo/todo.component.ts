import { Component } from '@angular/core';
import { TaskService } from './todo.service';

export interface Task {
  tasktitle: string
  taskdescription: string 
  taskaction: boolean 
  username?: string // optional 
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
    this.taskService.fetchTasks().subscribe(
      (tasks: any) => {
        this.tasks = tasks;
      },
      (error) => {
        console.error('Erro ao buscar tarefas:', error);
      }
    );
  }

  toggleTaskState(taskTitle: string): void { 
    const task = this.tasks.find(t => t.tasktitle === taskTitle); 

    if (!task) {
      console.error('Tarefa não encontrada:', taskTitle);
      return;
    }

    this.taskService.updateTaskState(task.tasktitle, !task.taskaction).subscribe(
      (response) => {
        task.taskaction = !task.taskaction;
        console.log('Estado da tarefa atualizado:', response);
      },
      (error) => {
        console.error('Erro ao atualizar estado da tarefa:', error);
      }
    );
  }
}
