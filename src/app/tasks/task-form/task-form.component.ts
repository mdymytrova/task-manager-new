import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ITask } from '../interfaces';
import { Priority, Status, TaskEventType, TaskType } from '../enums';
import { TasksDataService } from '../../services/tasks-data.service';
import { TasksEventService } from '../../services/tasks-event.service';
import { TaskDataService } from '../services/task-data.service';
import { IModalDialogData } from '../../modal/modal-config.interface';

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
        @Inject(MAT_DIALOG_DATA) dialogData: IModalDialogData<ITask>
    ) {
        this.title = dialogData.title;
        this.task = {
            ...dialogData.data
        };
    }

    public ngOnInit() {
        this.form = this.formBuilder.group({
            summary: [this.task.summary || '', Validators.required],
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
        if(this.form.valid) {
            const eventType = this.task.id ? TaskEventType.UPDATE : TaskEventType.CREATE;
            const taskToSave: ITask = {
                ...this.form.value,
                id: this.task.id || `TIS-${this.tasksDataService.getTasksLength() + 1}`,
                createdOn: this.task.createdOn || new Date(),
            };
            this.tasksDataService.updateTasks(eventType, taskToSave);
            this.tasksEventService.onTaskListUpdate.next({
                eventType: eventType
            });
            this.dialogRef.close(taskToSave);
        }
    }
}
