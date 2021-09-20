import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { ITask } from '../tasks/interfaces';
import { TasksDataService } from './tasks-data.service';

@Injectable({providedIn: 'root'})
export class TaskResolverService implements Resolve<ITask> {
    constructor(private tasksDataService: TasksDataService,) {}
    
    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.tasksDataService.getTaskById(route.paramMap.get('id'));
    }
}