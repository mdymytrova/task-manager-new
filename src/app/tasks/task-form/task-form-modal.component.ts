import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ITask } from '../interfaces';
import { TasksDataService } from '../../services/tasks-data.service';
import { TaskFormComponent } from './task-form.component';
import { ModalBaseComponent } from '../../modal/modal-base.component';
import { IModalDialogData } from '../../modal/modal-config.interface';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { modalOpen, resetError } from '../store/tasks.actions';

@Component({
    template: '',
})
export class TaskFormModalComponent extends ModalBaseComponent implements OnInit {
    public task: ITask;
    public mode;

    constructor(public router: Router, public route: ActivatedRoute, public matDialog: MatDialog, public tasksDataService: TasksDataService, private store: Store<fromApp.AppState>) { 
        super(matDialog);
    }

    public ngOnInit() {
        this.mode = this.route.snapshot.data['mode'];
        const dialogConfig = this.getCustomDialogConfig();
        this.store.dispatch(modalOpen());
        this.store.dispatch(resetError());
        this.openDialog(TaskFormComponent, dialogConfig, this.onClose);
    }

    private getCustomDialogConfig(): IModalDialogData<any> {
        return {
            data: { mode: this.mode },
            panelClass: ['modal-form', 'modal-form--create'],
            disableClose: true
        };
    }

    private onClose = (task) => {
        this.store.dispatch(resetError());
        this.router.navigate(['/tasks', { outlets: { modal: null }}]); // create
    }
}
