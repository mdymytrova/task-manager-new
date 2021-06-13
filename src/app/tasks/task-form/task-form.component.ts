import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ITask } from '../interfaces';
import { Priority, Status, TaskType } from '../enums';
import { TasksDataService } from '../../services/tasks-data.service';
import { TaskDataService } from '../services/task-data.service';


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
        @Inject(MAT_DIALOG_DATA) data
    ) {
        this.title = data.title;
        this.task = {
            ...data.task
        };
    }

    public ngOnInit() {
        this.form = this.formBuilder.group({
            summary: this.task.summary || '',
            description: this.task.description || '',
            type: this.task.type || null,
            status: this.task.status || Status.NEW,
            priority: this.task.priority || Priority.MAJOR
        });
        this.priorityData = this.taskDataService.getPriorities();
        this.typeData = this.taskDataService.getTypes();
        this.statusData = this.taskDataService.getStatuses();
    }

    public save() {
        const taskToSave: ITask = {
            ...this.form.value,
            id: this.task.id || `TIS-${this.tasksDataService.getTasksLength() + 1}`,
            createdOn: this.task.createdOn || new Date(),
        }
        this.dialogRef.close(taskToSave);
    }

    public close() {
        this.dialogRef.close();
    }
}
