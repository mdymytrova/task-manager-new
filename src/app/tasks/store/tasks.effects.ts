import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { TasksDataService } from '../../services/tasks-data.service';
import { ITask } from '../interfaces';
import { createTaskFailure, createTaskRequest, createTaskSuccess, deleteTaskFailure, deleteTaskRequest, deleteTaskSuccess, loadTaskFailure, loadTaskRequest, loadTasksFailure, loadTasksRequest, loadTasksSuccess, loadTaskSuccess, updateTaskFailure, updateTaskRequest, updateTaskSuccess } from './tasks.actions';

@Injectable()
export class TasksEffects {
    loadTasksRequest$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadTasksRequest),
            switchMap((action) => 
                this.tasksDataService.getTasks().pipe(
                    map((responseData) => {
                        const tasks = [];
                        for (const key in responseData) {
                            tasks.push({
                                ...responseData[key],
                                id: key
                            });
                        }
                        return loadTasksSuccess({ tasks });
                    }),
                    catchError((errorResponse) => {
                        return of(loadTasksFailure());
                    })
                )
            )
        )
    );

    loadTaskRequest$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadTaskRequest),
            switchMap((action) => 
                this.tasksDataService.getTaskById(action.id).pipe(
                    map((task) => {
                        return loadTaskSuccess({ task: { ...task, id: action.id } });
                    }),
                    catchError((errorResponse) => {
                        return of(loadTaskFailure());
                    })
                )
            )
        )
    );

    createTaskRequest$ = createEffect(() => 
        this.actions$.pipe(
            ofType(createTaskRequest),
            switchMap((action) => 
                this.tasksDataService.createTask(action.task).pipe(
                    map((taskResponse: any) => {
                        return createTaskSuccess({ task: { ...action.task, id: taskResponse.name} });
                    }),
                    catchError((errorResponse) => {
                        return of(createTaskFailure({errorMessage: errorResponse?.error?.error || 'An error occured.'}));
                    })
                )
            )
        )
    );

    updateTaskRequest$ = createEffect(() => 
        this.actions$.pipe(
            ofType(updateTaskRequest),
            switchMap((action) => 
                this.tasksDataService.updateTask(action.task).pipe(
                    map((task: ITask) => {
                        return updateTaskSuccess({ task });
                    }),
                    catchError((errorResponse) => {
                        return of(updateTaskFailure({errorMessage: errorResponse?.error?.error || 'An error occured.'}));
                    })
                )
            )
        )
    );

    deleteTaskRequest$ = createEffect(() => 
        this.actions$.pipe(
            ofType(deleteTaskRequest),
            switchMap((action) => 
                this.tasksDataService.deleteTask(action.id).pipe(
                    map(() => {
                        this.router.navigate(['/tasks']);
                        return deleteTaskSuccess({ id: action.id });
                    }),
                    catchError((errorResponse) => {
                        return of(deleteTaskFailure({errorMessage: errorResponse?.error?.error || 'An error occured.'}));
                    })
                )
            )
        )
    );

    constructor(private actions$: Actions, private tasksDataService: TasksDataService, private router: Router) {}
}
