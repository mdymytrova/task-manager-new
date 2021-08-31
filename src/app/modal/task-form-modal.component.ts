import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ITask } from '../tasks/interfaces';
import { TaskEventType } from '../tasks/enums';
import { TasksDataService } from '../services/tasks-data.service';
import { TasksEventService } from '../services/tasks-event.service';
import { TaskFormComponent } from '../tasks/task-form/task-form.component';
import { ModalBaseComponent } from './modal-base.component';

@Component({
    template: '',
})
export class TaskFormModalComponent extends ModalBaseComponent implements OnInit {
    public title;
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

    private getDialogData() {
        return {
            title: this.taskId ? 'Edit Task' : 'New Task',
            task: this.taskId ? this.tasksDataService.getTaskById(this.taskId) : {}
        };
    }

    private onClose = (task) => {
        const eventType = this.taskId ? TaskEventType.UPDATE : TaskEventType.CREATE;
        if (this.taskId) {
            if (this.route.snapshot.outlet === 'standalone-edit') {
                this.router.navigateByUrl(`/task/${this.taskId}`);
            } else {
                this.router.navigateByUrl(`/tasks/${this.taskId}`);
            }
        } else {
            this.router.navigate([{ outlets: { create: null }}]);
        }

        if (task) {
            this.tasksDataService.updateTasks(eventType, task);
            this.tasksEventService.onTaskListUpdate.next({
                eventType: eventType
            });
        }
    }
}
