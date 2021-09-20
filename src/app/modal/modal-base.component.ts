import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
    template: '',
})
export class ModalBaseComponent {

    constructor(public matDialog: MatDialog) { }

    public openDialog(dialogComponent, customConfig, onCloseCallback) {
        const dialogConfig = this.getDialogConfig(customConfig);
        
        this.matDialog
            .open(dialogComponent, dialogConfig)
            .beforeClosed()
            .subscribe(onCloseCallback);
    }

    private getDialogConfig(customConfig) {
        const dialogConfig = new MatDialogConfig();
        return {
            ...dialogConfig,
            ...customConfig
        };
    }
}
