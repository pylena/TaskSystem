import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { deleteTaskFailure, deleteTaskSuccess, loadTasks, loadTasksFailure, loadTasksSuccess } from '../state/task.actions';
import { selectAllTasks, selectTaskError } from '../state/task.selectors';
import { Observable } from 'rxjs/internal/Observable';
import { Task } from '../state/task.reducer';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskService } from '../task.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule,TaskFormComponent,RouterModule,FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  error$: Observable<string | null>;
  tasks$: Observable<Task[]>; // Observable for tasks
  filteredTasks$: Observable<Task[]>; // to filtere & sorted tasks

  
  statusFilter: string = 'all';
  sortBy: string = 'title';

  constructor(
    private store: Store,
    private taskService: TaskService,
    private router: Router
  ) {
    // step1: Initialize 
    this.tasks$ = this.store.select(selectAllTasks);
    this.error$ = this.store.select(selectError);

    
    this.filteredTasks$ = combineLatest([this.tasks$]).pipe(
      map(([tasks]) => {
        let filteredTasks = [...tasks];

        if (this.sortBy === 'title') {
          filteredTasks = [...filteredTasks].sort((a, b) => a.title.localeCompare(b.title));
        }
        if (this.statusFilter === 'completed') {
          filteredTasks = filteredTasks.filter((task) => task.completed);
        } else if (this.statusFilter === 'pending') {
          filteredTasks = filteredTasks.filter((task) => !task.completed);
        }

        

        return filteredTasks;
      })
    );
  }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => this.store.dispatch(loadTasksSuccess({ tasks })),
      error: (error) => this.store.dispatch(loadTasksFailure({ error: error.message })),
    });
  }

  editTask(task: Task) {
    this.router.navigate(['/edit', task.id]);
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe({
      next: () => this.store.dispatch(deleteTaskSuccess({ id })),
      error: (error) => this.store.dispatch(deleteTaskFailure({ error: error.message })),
    });
  }

  applyFilters() {
    
    this.filteredTasks$ = combineLatest([this.tasks$]).pipe(
      map(([tasks]) => {
      
        let filteredTasks = [...tasks];

       
        if (this.statusFilter === 'completed') {
          filteredTasks = filteredTasks.filter((task) => task.completed);
        } else if (this.statusFilter === 'pending') {
          filteredTasks = filteredTasks.filter((task) => !task.completed);
        }

       
        if (this.sortBy === 'title') {
          filteredTasks = [...filteredTasks].sort((a, b) => a.title.localeCompare(b.title));
        }

        return filteredTasks;
      })
    );
  }
}

