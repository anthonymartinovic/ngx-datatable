import { Component, Input, ViewChild, ChangeDetectorRef, AfterViewInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';

import { ColumnConfig } from './models/column.model';

import { PagerComponent } from './components/pager/pager.component';
import { TableDataService } from './components/table/table.data.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'ngx-flexi-table',
	providers: [TableDataService],
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['./ngx-flexi-table.component.scss'],
	template: `
		<app-table
			[caption]="caption"
			[routerCaption]="routerCaption"
			[config]="config"
			[records]="records"
			[pagedRecords]="pagedRecords"
			(afterSetSort)="initSetPage()"
		></app-table>
		<app-pager
			[records]="records"
			[recordsPerPage]="recordsPerPage"
			(pagedRecordsChange)="updatePagedRecords($event)"
		></app-pager>
	`
})
export class FlexiTableComponent implements AfterViewInit, OnDestroy {
	initSetPageSubscription: Subscription;

	@ViewChild(PagerComponent) private _pagerComponent: PagerComponent;

	@Input() caption: string;
	@Input() routerCaption: string;
	@Input() config: ColumnConfig[];
	@Input() records: {}[];
	@Input() recordsPerPage: number;

	pagedRecords: {}[];

	constructor(
		private _cdr: ChangeDetectorRef,
		private _data: TableDataService
	) {
		this.initSetPageSubscription = this._data.initSetPageSubject$.subscribe(() => this.initSetPage());
	}

	ngAfterViewInit(): void {
		this.initSetPage();
		this._cdr.detectChanges();
	}

	ngOnDestroy() {
		this.initSetPageSubscription.unsubscribe();
	}

	initSetPage(): void {
		this._pagerComponent.setPage(1, true);
	}

	updatePagedRecords(event: {}[]): void {
		this.pagedRecords = event;
	}
}
