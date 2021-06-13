import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
    template: '',
})
export class ModalBaseComponent {

    constructor(public matDialog: MatDialog) { }

    public openDialog(dialogComponent, dialogData, onCloseCallback) {
        const dialogConfig = this.getDialogConfig(dialogData);
        
        this.matDialog
            .open(dialogComponent, dialogConfig)
            .beforeClosed()
            .subscribe(onCloseCallback);
    }

    private getDialogConfig(dialogData) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = dialogData;
        dialogConfig.panelClass = 'task-create';
        return dialogConfig;
    }
}
