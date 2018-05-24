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
	ErrorHandler,
	HostBinding
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { PagerComponent } from './components/pager/pager.component';

import { ColumnConfig, ColumnMap } from './models/column.model';
import { StylesModel } from './models/styles.model';
import { TableInit } from './models/table-init.model';

import { TableDataService } from './data/table.data.service';

@Component({
	selector: 'ngx-flexi-table',
	host: { 'class': 'ngx-flexi-table' },
	providers: [TableDataService],
	styleUrls: ['./ngx-flexi-table.component.scss'],
	template: `
		<div class="flexi-table-header" [class.hide-table-header-inner]="init && !init.header">
			<div class="table-caption-container" [class.caption-container-border]="init.caption">
				<caption *ngIf="init.caption" class="table-caption">{{ init.caption }}</caption>
			</div>
			<ngx-exporter
				*ngIf="init.exportOptions"
				[records]="records"
				[checkedRecords]="checkedRecords"
			></ngx-exporter>
			<ngx-filter
				*ngIf="globalFilter && (!columnFilters || !columnFilters.length)"
				[columns]="columns"
				[records]="records"
				[globalFilter]="globalFilter"
				(recordsChange)="filterRecords($event)"
			></ngx-filter>
		</div>
		<div class="flexi-table-content">
			<ngx-table></ngx-table>
		</div>
		<div class="flexi-table-footer" [class.hide-table-footer-inner]="init && !init.footer">
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
	rowSelectionSub: Subscription;
	newTabSelectionSub: Subscription;

	@HostBinding('class.hide-table-header') hideTableHeader;
	@HostBinding('class.hide-table-footer') hideTableFooter;
	@HostBinding('class.only-table-content') onlyTableContent;

	@ViewChild(PagerComponent) private _pagerComponent: PagerComponent;

	@Input() init: TableInit;
	@Input() config: ColumnConfig[];
	@Input() globalFilter: string;
	@Input() columnFilters: string[];
	@Input() groupBy: string[];
	@Input() records: {}[];
	@Input() recordsPerPage: number;
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
		if (!this.init) this.init = new TableInit;

		this.hideTableHeader = (this.init.header) ? false : true;
		this.hideTableFooter = (this.init.footer) ? false : true;
		this.onlyTableContent = (this.hideTableHeader && this.hideTableFooter) ? true : false;

		if (!this.records) return this._errorHandler.handleError(`No records passed into table`);

		this.tableData.publishStyles(this.styles);
		this.tableData.publishGroupBy(this.groupBy);
		
		this.recordsCopy = this.records;
		this.tableData.publishRecords(this.recordsCopy);

		this.stopEmission = true;
		this.tableData.publishCheckedRecords([]);
		this.stopEmission = false;

		this.tableData.publishSelectableState(this.init.selectable);
		this.tableData.publishCheckboxState(this.init.checkboxes);
		this.tableData.publishRowDetailState(this.init.rowDetail);
		this.tableData.publishNewTabState(this.init.newTab.show);
		this.tableData.publishNewTabCaption(this.init.newTab.caption);
		this.tableData.publishNewTabKeys(this.init.newTab.keys);
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
