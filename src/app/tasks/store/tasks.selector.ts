import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

const tasksSelector = (state: fromApp.AppState) => {
    return state.tasks;
  };

export const getSelectedTask = createSelector(tasksSelector, (state) => state.selectedTask);
export const getModalState = createSelector(tasksSelector, (state) => state.modalOpen);
export const getError = createSelector(tasksSelector, (state) => state.error);