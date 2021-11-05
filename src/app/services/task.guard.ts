import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { ITask } from '../tasks/interfaces';
import { loadTaskRequest } from '../tasks/store/tasks.actions';
import { getSelectedTask } from '../tasks/store/tasks.selector';

@Injectable()
export class TaskGuard implements CanActivate {
    constructor(private store: Store<fromApp.AppState>) {}

    getFromStoreOrAPI(id: string) {
        return this.store
            .select(getSelectedTask)
            .pipe(
                tap((selectedTask: ITask) => {
                    if (!selectedTask) {
                        this.store.dispatch(loadTaskRequest({ id }));
                    }
                })
            )
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.getFromStoreOrAPI(route.paramMap.get('id'))
            .pipe(
                switchMap(() => of(true)),
                catchError(() => of(false))
            );
    }
}