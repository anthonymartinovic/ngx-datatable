import { 
	Component, 
	ChangeDetectionStrategy, 
	OnChanges, 
	OnInit, 
	AfterViewInit, 
	OnDestroy, 
	Input, 
	Output,
	EventEmitter,
	ViewChild, 
	SimpleChanges, 
	ChangeDetectorRef,
	ErrorHandler
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { PagerComponent } from './components/pager/pager.component';

import { ColumnConfig, ColumnMap } from './models/column.model';
import { StylesModel } from './models/styles.model';

import { TableDataService } from './data/table.data.service';

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
				[globalFilter]="globalFilter"
				(recordsChange)="filterRecords($event)"
			></ngx-filter>
		</div>
		<ngx-table></ngx-table>
		<div class="flexi-table-footer">
			<ngx-pager
				[records]="recordsCopy"
				[recordsPerPage]="recordsPerPage"
				[checkedRecords]="checkedRecords"
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
	rowSelectionSub: Subscription;
	newTabSelectionSub: Subscription;

	@ViewChild(PagerComponent) private _pagerComponent: PagerComponent;

	@Input() caption: string;
	@Input() newTabCaption: string;
	@Input() newTabKeys: string[];
	@Input() config: ColumnConfig[];
	@Input() globalFilter: string;
	@Input() columnFilters: string[];
	@Input() records: {}[];
	@Input() recordsPerPage: number;
	@Input() groupBy: string[];
	@Input() styles: StylesModel;

	@Output() onRowSelection: EventEmitter<{}>     = new EventEmitter();
	@Output() onCheckboxChange: EventEmitter<{}[]> = new EventEmitter();
	@Output() onNewTabSelection: EventEmitter<any> = new EventEmitter();

	stopEmission: boolean = false;

	recordsCopy: {}[];
	checkedRecords: {}[];
	pagedRecords: {}[];
	columns: ColumnMap[];

	constructor(
		public tableData: TableDataService,
		private _errorHandler: ErrorHandler,
		private _cdr: ChangeDetectorRef
	) {
		this.recordsSub          = this.tableData.records$.subscribe(records => this.recordsCopy = records);
		this.filterRecordsSub    = this.tableData.filterRecordsSubject$.subscribe(filteredRecords => this.filterRecords(filteredRecords));
		this.initSetPageSub      = this.tableData.initSetPageSubject$.subscribe(() => this.initSetPage());
		this.rowSelectionSub     = this.tableData.rowSelection$.subscribe(row => this.onRowSelection.emit(row));
		this.newTabSelectionSub  = this.tableData.newTabSelection$.subscribe(newTab => this.onNewTabSelection.emit(newTab));
		this.checkedRecordsSub   = this.tableData.checkedRecords$.subscribe(checkedRecords => {
			this.checkedRecords = checkedRecords;
			if (!this.stopEmission) this.onCheckboxChange.emit(this.checkedRecords);
		});
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
			this.reDeployTable();
	}

	ngOnInit(): void { this.onInit() };
	onInit(): void {
		this.tableData.publishStyles(this.styles);
		this.tableData.publishGroupBy(this.groupBy);
		
		this.recordsCopy = this.records;
		this.tableData.publishRecords(this.recordsCopy);

		this.stopEmission = true;
		this.tableData.publishCheckedRecords([]);
		this.stopEmission = false;
		
		this.tableData.publishNewTabCaption(this.newTabCaption);
		this.tableData.publishNewTabKeys(this.newTabKeys);
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
		this.rowSelectionSub.unsubscribe();
		this.newTabSelectionSub.unsubscribe();
	}

	reDeployTable(): void {
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
