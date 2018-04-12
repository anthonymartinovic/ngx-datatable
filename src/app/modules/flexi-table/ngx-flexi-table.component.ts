import { Component, OnInit, Input, ViewChild, ChangeDetectorRef, AfterViewInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';

import { ColumnConfig } from './models/column.model';

import { PagerComponent } from './components/pager/pager.component';
import { TableDataService } from './components/table/table.data.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'ngx-flexi-table',
	host: { 'class': 'ngx-flexi-table' },
	providers: [TableDataService],
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['./ngx-flexi-table.component.scss'],
	template: `
		<ngx-table
			[caption]="caption"
			[config]="config"
			[records]="records"
		></ngx-table>
		<ngx-pager
			[records]="records"
			[recordsPerPage]="recordsPerPage"
			(pagedRecordsChange)="updatePagedRecords($event)"
		></ngx-pager>
	`
})
export class FlexiTableComponent implements OnInit, AfterViewInit, OnDestroy {
	initSetPageSubscription: Subscription;

	@ViewChild(PagerComponent) private _pagerComponent: PagerComponent;

	@Input() caption: string;
	@Input() newTabCaption: string;
	@Input() config: ColumnConfig[];
	@Input() records: {}[];
	@Input() recordsPerPage: number;

	pagedRecords: {}[];

	constructor(
		private _cdr: ChangeDetectorRef,
		private _tableData: TableDataService
	) {
		this.initSetPageSubscription = this._tableData.initSetPageSubject$.subscribe(() => this.initSetPage());
	}

	ngOnInit() {
		this._tableData.publishNewTabCaption(this.newTabCaption);
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

	updatePagedRecords(newPagedRecords: {}[]): void {
		this.pagedRecords = newPagedRecords;
		this._tableData.publishPagedRecords(this.pagedRecords);
	}
}
