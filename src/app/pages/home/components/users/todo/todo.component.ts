import { Component } from '@angular/core';

interface Task {
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
  tasks: Task[] = [
    {title: 'Tarefa 1', description: 'Description', done: false, owner: 'Alice'},
    {title: 'Tarefa 2', description: 'Description', done: true, owner: 'Bob'},
    {title: 'Tarefa 3', description: 'Description', done: false},
    {title: 'Tarefa 4', description: 'Description', done: true, owner: 'Charlie'},
    {title: 'Tarefa 5', description: 'Description', done: false, owner: 'Dana'}
  ]

  toogleDone(tasks: Task) {
    tasks.done = !tasks.done
  }
}
