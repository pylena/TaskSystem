import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TaskService } from '../task.service';
import { addTaskSuccess, addTaskFailure, updateTaskSuccess, updateTaskFailure} from '../state/task.actions';
import { Task } from '../state/task.reducer'

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
  task: Task = { id:'0' , title: '', description: '', completed: false };
  isEdit = false;

  constructor(
    private store: Store,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.isEdit = true;
      this.fetchTask(+taskId); 
    }
  }

  fetchTask(id: number) {
    this.taskService.getTask(id).subscribe({
      next: (task) => {
        this.task = task; // retrive  form with the fetched task list
      },
      error: (error) => {
        console.error('Failed to fetch task:', error);
      },
    });
  }

  onSubmit() {
    if (this.isEdit) {
      this.taskService.updateTask(this.task).subscribe({
        next: (task) => {
          this.store.dispatch(updateTaskSuccess({ task })); // Dispatch update Task Success
          this.router.navigate(['/']); 
        },
        error: (error) => this.store.dispatch(updateTaskFailure({ error: error.message })),
      });
    } else {
      this.taskService.addTask(this.task).subscribe({
        next: (task) => {
          this.store.dispatch(addTaskSuccess({ task })); // Dispatch add TaskS uccess
          this.router.navigate(['/']); 
        },
        error: (error) => this.store.dispatch(addTaskFailure({ error: error.message })),
      });
    }
  }
}