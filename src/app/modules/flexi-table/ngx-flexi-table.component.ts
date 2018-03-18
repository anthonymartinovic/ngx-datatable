import { Component, Input, ViewChild, ChangeDetectorRef, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';

import { ColumnConfig } from './models/column.model';

import { PagerComponent } from './components/pager/pager.component';

@Component({
	selector: 'ngx-flexi-table',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['./ngx-flexi-table.component.scss'],
	template: `
		<app-table
			[caption]="caption"
			[routerCaption]="routerCaption"
			[config]="config"
			[records]="records"
			[pagedRecords]="pagedRecords"
			(afterSetSort)="setPage()"
		></app-table>
		<app-pager
			[records]="records"
			[recordsPerPage]="recordsPerPage"
			(pagedRecordsChange)="updatePagedRecords($event)"
		></app-pager>
	`
})
export class FlexiTableComponent implements AfterViewInit {
	@ViewChild(PagerComponent) private _pagerComponent;

	@Input() caption: string;
	@Input() routerCaption: string;
	@Input() config: ColumnConfig[];
	@Input() records: any[];
	@Input() recordsPerPage: number;

	pagedRecords: {}[];

	constructor(
		private _cdr: ChangeDetectorRef
	) {}

	ngAfterViewInit() {
		this.setPage();
		this._cdr.detectChanges();
	}

	setPage() {
		this._pagerComponent.setPage(1, true);
	}
	
	updatePagedRecords(event: {}[]) {
		this.pagedRecords = event;
	}

}
