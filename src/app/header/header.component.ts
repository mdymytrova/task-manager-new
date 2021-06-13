import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { PageSelectionEventService } from '../services/page-selection-event.service';

import { HeaderPage, TaskEventType } from '../tasks/enums';
import { TaskEvent } from '../tasks/interfaces';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
    public headerPages = HeaderPage;
    public selectedPage: HeaderPage;

    constructor(private pageSelectionEventService: PageSelectionEventService, private router: Router, private activatedRoute: ActivatedRoute, public matDialog: MatDialog) { }

    public ngOnInit(): void {
        this.pageSelectionEventService.onPageSelect.emit(HeaderPage.BACKLOG);
    }

    public pageSelectionEventHandler = (selectedPage: HeaderPage) => {
        this.selectedPage = selectedPage;
        this.pageSelectionEventService.onPageSelect.emit(selectedPage);
    }

}