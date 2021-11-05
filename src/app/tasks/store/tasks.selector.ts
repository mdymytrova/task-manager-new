import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

const tasksSelector = (state: fromApp.AppState) => {
    return state.tasks;
  };

export const getSelectedTask = createSelector(tasksSelector, (state) => state.selectedTask);
export const getModalState = createSelector(tasksSelector, (state) => state.modalOpen);
export const getLoadError = createSelector(tasksSelector, (state) => state.errorLoad);
export const getCreateUpdateActionError = createSelector(tasksSelector, (state) => state.errorCreateUpdate);
export const getDeleteActionError = createSelector(tasksSelector, (state) => state.errorDelete);