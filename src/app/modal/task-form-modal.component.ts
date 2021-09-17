import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ITask } from '../tasks/interfaces';
import { TasksDataService } from '../services/tasks-data.service';
import { TasksEventService } from '../services/tasks-event.service';
import { TaskFormComponent } from '../tasks/task-form/task-form.component';
import { ModalBaseComponent } from './modal-base.component';
import { IModalDialogData } from './modal-config.interface';

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
        const dialogData = this.getDialogData();
        this.openDialog(TaskFormComponent, dialogData, this.onClose);
    }

    private getDialogData(): IModalDialogData<ITask> {
        return {
            title: this.task && this.task.id ? 'Edit Task' : 'New Task',
            data: this.task
        };
    }

    private onClose = (task) => {
        if (this.task && this.task.id) {
            if (this.route.snapshot.outlet === 'standalone-edit') {
                this.router.navigateByUrl(`/task/${this.task.id}`);
            } else {
                this.router.navigateByUrl(`/tasks/${this.task.id}`);
            }
        } else {
            this.router.navigate([{ outlets: { create: null }}]);
        }
    }
}
