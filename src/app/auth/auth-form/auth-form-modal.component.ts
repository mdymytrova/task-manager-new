import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ModalBaseComponent } from '../../modal/modal-base.component';
import { AuthFormComponent } from './auth-form.component';
import { IModalDialogData } from 'src/app/modal/modal-config.interface';

@Component({
    template: '',
})
export class AuthFormModalComponent extends ModalBaseComponent implements OnInit {
    constructor(public router: Router, public route: ActivatedRoute, public matDialog: MatDialog) { 
        super(matDialog);
    }

    public ngOnInit() {
        const dialogConfig = this.getCustomDialogConfig();
        this.openDialog(AuthFormComponent, dialogConfig, this.onClose);
    }

    private getCustomDialogConfig(): IModalDialogData<any> {
        return {
            data: {},
            panelClass: ['modal-form', 'modal-form--auth'],
            disableClose: true
        };
    }

    private onClose = () => {
        this.router.navigate([{ outlets: { modal: null }}]);
    }
}
