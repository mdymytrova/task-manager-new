import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogState } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ITask } from '../interfaces';
import { Priority, Status, TaskEventType, TaskType } from '../enums';
import { TaskDataService } from '../../services/task-data.service';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { createTaskRequest, resetError, updateTaskRequest } from '../store/tasks.actions';
import { Subscription } from 'rxjs';
import { getModalState, getSelectedTask, getCreateUpdateActionError } from '../store/tasks.selector';
import { ErrorAlert } from '../../modal/error-alert/error-alert.component';

@Component({
    selector: 'modal',
    styleUrls: ['./task-form.component.scss'],
    templateUrl: './task-form.component.html',
})
export class TaskFormComponent implements OnInit, OnDestroy{
    public form: FormGroup;
    public title;
    private mode;
    public task: ITask;
    public priorityData: Priority[] = [];
    public typeData: TaskType[] = [];
    public statusData: Status[] = [];
    private selectedTaskSubscription: Subscription;
    private modalStateSubscription: Subscription;
    private errorSubscription: Subscription;

    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<TaskFormComponent>,
        private taskDataService: TaskDataService,
        private store: Store<fromApp.AppState>,
        private dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) dialogData: any
    ) {
        this.title = dialogData && dialogData.mode === 'edit' ? 'Edit Task' : 'New Task';
        this.mode = dialogData.mode;
        this.task = { } as ITask;
    }

    public ngOnInit() {
        this.initForm();
        this.selectedTaskSubscription = this.store.select(getSelectedTask).subscribe(selectedTask => {
            if (selectedTask && this.mode === 'edit') {
                this.task = {
                    ...this.task,
                    ...selectedTask
                };
                this.patchForm(this.task);
            }
        });
        this.modalStateSubscription = this.store.select(getModalState).subscribe(modalOpen => {
            if (!modalOpen) {
                this.dialogRef.close(this.task);
            }
        });
        this.errorSubscription = this.store.select(getCreateUpdateActionError).subscribe(errorMessage => {
            if (errorMessage) {
                this.dialog.open(ErrorAlert, { data: errorMessage });
            }
        });
        this.priorityData = this.taskDataService.getPriorities();
        this.typeData = this.taskDataService.getTypes();
        this.statusData = this.taskDataService.getStatuses();
    }

    public ngOnDestroy() {
        this.selectedTaskSubscription.unsubscribe();
        this.modalStateSubscription.unsubscribe();
        this.errorSubscription.unsubscribe();
    }

    public save() {
        if(this.form.valid) {
            this.store.dispatch(resetError());
            const eventType = this.task.id ? TaskEventType.UPDATE : TaskEventType.CREATE;
            const taskToSave: ITask = {
                ...this.form.value,
                createdOn: this.task.createdOn || new Date(),
            };
            if (this.task.id) {
                taskToSave.id = this.task.id;
            }
            if (eventType === TaskEventType.CREATE) {
                this.store.dispatch(createTaskRequest({task: taskToSave}));
            } else {
                this.store.dispatch(updateTaskRequest({task: taskToSave}));
            }
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
