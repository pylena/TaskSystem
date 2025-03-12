import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TaskState } from './task.reducer';

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const selectAllTasks = createSelector(selectTaskState, (state) => state.tasks);
export const selectTaskError = createSelector(selectTaskState, (state) => state.error);