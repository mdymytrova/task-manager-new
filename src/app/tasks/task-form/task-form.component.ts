import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ITask } from '../interfaces';
import { Priority, Status, TaskEventType, TaskType } from '../enums';
import { TasksDataService } from '../../services/tasks-data.service';
import { TasksEventService } from '../../services/tasks-event.service';
import { TaskDataService } from '../../services/task-data.service';
import { ErrorAlert } from '../../modal/error-alert/error-alert.component';

@Component({
    selector: 'modal',
    styleUrls: ['./task-form.component.scss'],
    templateUrl: './task-form.component.html',
})
export class TaskFormComponent {
    public form: FormGroup;
    public title;
    public task: ITask;
    public priorityData: Priority[] = [];
    public typeData: TaskType[] = [];
    public statusData: Status[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<TaskFormComponent>,
        private tasksDataService: TasksDataService,
        private taskDataService: TaskDataService,
        public tasksEventService: TasksEventService,
        private dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) dialogData: ITask
    ) {
        this.title = dialogData && dialogData.id ? 'Edit Task' : 'New Task';
        this.task = {
            ...dialogData
        };
    }

    public ngOnInit() {
        this.initForm();
        if (this.task.id) {
            this.tasksDataService.getTaskById(this.task.id).subscribe(task => {
                this.task = {
                    ...this.task,
                    ...task
                };
                this.patchForm(this.task);
            });
        }
        this.priorityData = this.taskDataService.getPriorities();
        this.typeData = this.taskDataService.getTypes();
        this.statusData = this.taskDataService.getStatuses();
    }

    public save() {
        if(this.form.valid) {
            const eventType = this.task.id ? TaskEventType.UPDATE : TaskEventType.CREATE;
            const taskToSave: ITask = {
                ...this.form.value,
                createdOn: this.task.createdOn || new Date(),
            };
            if (this.task.id) {
                taskToSave.id = this.task.id;
            }
            this.tasksDataService.updateTasks(eventType, taskToSave).subscribe(response => {
                this.tasksEventService.onTaskListUpdate.next({ eventType });
                this.dialogRef.close(taskToSave);
            }, error => {
                this.dialog.open(ErrorAlert, { data: error });
            });
        }
    }

    private initForm() {
        this.form = this.formBuilder.group({
            summary: ['', Validators.required],
            description: '',
            type: null,
            status: Status.NEW,
            priority: Priority.MAJOR
        });
    }

    private patchForm(task: ITask) {
        this.form.patchValue({
            ...task
        });
    }
}
