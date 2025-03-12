import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './state/task.reducer';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'https://localhost:7191/api/Task';
  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }
  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/${id}`);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${task.id}`, task); 
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  /*
  getTaskbyId(id: string): Observable<void> {
    return this.http.getTaskByid<void>(`${this.baseUrl}/${id}`);
  } */
}


