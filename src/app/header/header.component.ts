import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { PageSelectionEventService } from '../services/page-selection-event.service';
import { HeaderPage } from '../tasks/enums';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
    public headerPages = HeaderPage;
    public selectedPage: HeaderPage;

    constructor(private pageSelectionEventService: PageSelectionEventService, public matDialog: MatDialog) { }

    public ngOnInit(): void {
        this.pageSelectionEventService.onPageSelect.next(HeaderPage.BACKLOG);
    }

    public pageSelectionEventHandler = (selectedPage: HeaderPage) => {
        this.selectedPage = selectedPage;
        this.pageSelectionEventService.onPageSelect.next(selectedPage);
    }

}