import { 
	Component, 
	ChangeDetectionStrategy, 
	OnChanges, 
	OnInit, 
	AfterViewInit, 
	OnDestroy, 
	Input, 
	ViewChild, 
	SimpleChanges, 
	ChangeDetectorRef
} from '@angular/core';

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
			<ngx-filter
				*ngIf="!columnFilters"
				[columns]="columns"
				[records]="records"
				[fixedFilterColumn]="fixedFilterColumn"
				(recordsChange)="filterRecords($event)"
			></ngx-filter>
		</div>
		<ngx-table></ngx-table>
		<div class="flexi-table-footer">
			<ngx-pager
				[records]="recordsCopy"
				[recordsPerPage]="recordsPerPage"
				(pagedRecordsChange)="updatePagedRecords($event)"
			></ngx-pager>
		</div>
	`
})
export class FlexiTableComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
	recordsSub: Subscription;
	checkedRecordsSub: Subscription;
	filterRecordsSub: Subscription;
	initSetPageSub: Subscription;

	@ViewChild(PagerComponent) private _pagerComponent: PagerComponent;

	@Input() caption: string;
	@Input() newTabCaption: string;
	@Input() config: ColumnConfig[];
	@Input() fixedFilterColumn: string;
	@Input() columnFilters: boolean = false;
	@Input() records: {}[];
	@Input() recordsPerPage: number;

	recordsCopy: {}[];
	checkedRecords: {}[];
	pagedRecords: {}[];
	columns: ColumnMap[];

	constructor(
		public tableData: TableDataService,
		private _cdr: ChangeDetectorRef
	) {
		this.recordsSub          = this.tableData.records$.subscribe(records => this.recordsCopy = records);
		this.checkedRecordsSub   = this.tableData.checkedRecords$.subscribe(checkedRecords => this.checkedRecords = checkedRecords);
		this.filterRecordsSub    = this.tableData.filterRecordsSubject$.subscribe(filteredRecords => this.filterRecords(filteredRecords));
		this.initSetPageSub      = this.tableData.initSetPageSubject$.subscribe(() => this.initSetPage());
	}

	ngOnChanges(changes: SimpleChanges) {
		(this.config)
			? this.columns = this.config.map(col => new ColumnMap(col))
			: this.columns = Object.keys(changes['records'].currentValue[0]).map(key => new ColumnMap({ primeKey: key }));

		this.tableData.publishColumns(this.columns);

		if (
			changes['records'] && changes['records'].previousValue ||
			changes['recordsPerPage'] && changes['recordsPerPage'].previousValue
		) 
			this.redeployTable();
	}

	ngOnInit(): void { this.onInit() };
	onInit(): void {
		this.recordsCopy = this.records;

		this.tableData.publishRecords(this.recordsCopy);
		this.tableData.publishCheckedRecords([]);
		this.tableData.publishNewTabCaption(this.newTabCaption);
		this.tableData.publishColumnFilters(this.columnFilters);
		this._cdr.detectChanges();
	}

	ngAfterViewInit(): void { this.afterViewInit() };
	afterViewInit(): void {
		this.initSetPage();
	}

	ngOnDestroy(): void {
		this.recordsSub.unsubscribe();
		this.checkedRecordsSub.unsubscribe();
		this.filterRecordsSub.unsubscribe();
		this.initSetPageSub.unsubscribe();
	}

	redeployTable(): void {
		this.onInit();
		this.afterViewInit();
	}

	initSetPage(): void {
		this._pagerComponent.setPage(1, true);
		this._cdr.detectChanges();
	}

	filterRecords(filteredRecords: {}[]): void {
		this.recordsCopy = filteredRecords;
		this.tableData.publishRecords(filteredRecords);
		this.tableData.runIsAllChecked();
		this._cdr.detectChanges();
		this.initSetPage();
	}

	updatePagedRecords(newPagedRecords: {}[]): void {
		this.pagedRecords = newPagedRecords;
		this.tableData.publishPagedRecords(this.pagedRecords);
	}
}
