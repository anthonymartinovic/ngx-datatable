import { Component, ChangeDetectionStrategy, OnChanges, OnInit, AfterViewInit, OnDestroy, Input, ViewChild, ChangeDetectorRef } from '@angular/core';

import { ColumnConfig, ColumnMap } from './models/column.model';

import { PagerComponent } from './components/pager/pager.component';
import { TableDataService } from './components/table/table.data.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'ngx-flexi-table',
	host: { 'class': 'ngx-flexi-table' },
	providers: [TableDataService],
	styleUrls: ['./ngx-flexi-table.component.scss'],
	template: `
		<div class="flexi-table-header">
			<caption *ngIf="caption" class="flexi-table-caption">{{ caption }}</caption>
			<ngx-filter></ngx-filter>
		</div>
		<ngx-table></ngx-table>
		<div class="flexi-table-footer">
			<ngx-pager
				[records]="records"
				[recordsPerPage]="recordsPerPage"
				(pagedRecordsChange)="updatePagedRecords($event)"
			></ngx-pager>
		</div>
	`
})
export class FlexiTableComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
	recordsSub: Subscription;
	checkedRecordsSub: Subscription;
	initSetPageSub: Subscription;

	@ViewChild(PagerComponent) private _pagerComponent: PagerComponent;

	@Input() caption: string;
	@Input() newTabCaption: string;
	@Input() config: ColumnConfig[];
	@Input() records: {}[];
	@Input() recordsPerPage: number;

	checkedRecords: {}[];
	pagedRecords: {}[];
	columns: ColumnMap[];

	constructor(
		public tableData: TableDataService,
		private _cdr: ChangeDetectorRef
	) {
		this.recordsSub          = this.tableData.records$.subscribe(records => this.records = records);
		this.checkedRecordsSub   = this.tableData.checkedRecords$.subscribe(checkedRecords => this.checkedRecords = checkedRecords);
		this.initSetPageSub      = this.tableData.initSetPageSubject$.subscribe(() => this.initSetPage());
	}

	ngOnChanges() {
		(this.config) 
			? this.columns = this.config.map(col => new ColumnMap(col))
			: this.columns = Object.keys(this.records[0]).map(key => new ColumnMap({ primeKey: key }));

		this.tableData.publishColumns(this.columns);
	}

	ngOnInit() {
		this.tableData.publishRecords(this.records);
		this.tableData.publishCheckedRecords([]);
		this.tableData.publishNewTabCaption(this.newTabCaption);
	}

	ngAfterViewInit(): void {
		this.initSetPage();
		this.tableData.publishLoading(false);
		this._cdr.detectChanges();
	}

	ngOnDestroy() {
		this.recordsSub.unsubscribe();
		this.checkedRecordsSub.unsubscribe();
		this.initSetPageSub.unsubscribe();
	}

	initSetPage(): void {
		this._pagerComponent.setPage(1, true);
	}

	updateRecords(records: {}[]): void {
		this.tableData.publishCheckedRecords
	}

	updatePagedRecords(newPagedRecords: {}[]): void {
		this.pagedRecords = newPagedRecords;
		this.tableData.publishPagedRecords(this.pagedRecords);
	}
}
