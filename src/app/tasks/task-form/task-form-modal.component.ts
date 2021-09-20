import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ITask } from '../interfaces';
import { TasksDataService } from '../../services/tasks-data.service';
import { TasksEventService } from '../../services/tasks-event.service';
import { TaskFormComponent } from './task-form.component';
import { ModalBaseComponent } from '../../modal/modal-base.component';
import { IModalDialogData } from '../../modal/modal-config.interface';

@Component({
    template: '',
})
export class TaskFormModalComponent extends ModalBaseComponent implements OnInit {
    public task: ITask;

    constructor(public router: Router, public route: ActivatedRoute, public matDialog: MatDialog, public tasksDataService: TasksDataService, public tasksEventService: TasksEventService) { 
        super(matDialog);
    }

    public ngOnInit() {
        this.task = this.route.snapshot.data['task'] || {} as ITask;
        const dialogConfig = this.getCustomDialogConfig();
        this.openDialog(TaskFormComponent, dialogConfig, this.onClose);
    }

    private getCustomDialogConfig(): IModalDialogData<ITask> {
        return {
            data: this.task,
            panelClass: ['modal-form', 'modal-form--create'],
            disableClose: true
        };
    }

    private onClose = (task) => {
        this.router.navigate([{ outlets: { modal: null }}]);
    }
}
