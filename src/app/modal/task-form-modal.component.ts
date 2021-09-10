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
    private taskId;

    constructor(public router: Router, public route: ActivatedRoute, public matDialog: MatDialog, public tasksDataService: TasksDataService, public tasksEventService: TasksEventService) { 
        super(matDialog);
    }

    public ngOnInit() {
        this.route.params
            .subscribe((params: Params) => {
                this.taskId = params.id;
            });
        const dialogData = this.getDialogData();
        this.openDialog(TaskFormComponent, dialogData, this.onClose);
    }

    private getDialogData(): IModalDialogData<ITask> {
        return {
            title: this.taskId ? 'Edit Task' : 'New Task',
            data: this.taskId ? this.tasksDataService.getTaskById(this.taskId) : {} as ITask
        };
    }

    private onClose = (task) => {
        if (this.taskId) {
            if (this.route.snapshot.outlet === 'standalone-edit') {
                this.router.navigateByUrl(`/task/${this.taskId}`);
            } else {
                this.router.navigateByUrl(`/tasks/${this.taskId}`);
            }
        } else {
            this.router.navigate([{ outlets: { create: null }}]);
        }
    }
}
