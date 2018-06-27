import { 
	Component,
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
	HostBinding
} from '@angular/core';
import { Subscription } from 'rxjs';

import { PagerComponent } from './components/pager/pager.component';
import { TableDataService } from './data/data.service';
import { DT_ColumnConfig, DT_ColumnMap } from './models/column.model';
import { DT_Init } from './models/init.model';
import { DT_ServerPageData } from './models/pager.model';
import { DT_Styles } from './models/styles.model';

@Component({
	selector: 'ngx-datatable',
	host: { 'class': 'ngx-datatable' },
	providers: [TableDataService],
	styleUrls: ['./ngx-datatable.component.scss'],
	template: `
		<div
			*ngIf="!forceLoader"
			headerStyle
			class="flexi-table-header"
			[class.hide-table-header-inner]="init && !init.header"
		>
			<div class="table-caption-container" [class.caption-container-border]="init && init.header && init.caption">
				<caption *ngIf="init && init.header && init.caption" class="table-caption">{{ init.caption }}</caption>
			</div>
			<ngx-exporter
				*ngIf="init && init.header && init.exportOptions"
				[init]="init"
				[records]="records"
				[checkedRecords]="checkedRecords"
				(serverExportAll)="onExportAll.emit($event)"
			></ngx-exporter>
			<ngx-filter
				*ngIf="init && init.header && init.filter.show && init.filter.type.toLowerCase() === 'global'"
				[init]="init"
				[columns]="columns"
				[loading]="loading"
				[records]="records"
				[globalFilter]="init.filter.keys"
				(recordsChange)="filterRecords($event)"
				(serverFilterChange)="onFilterChange.emit($event)"
			></ngx-filter>
		</div>
		<div class="flexi-table-content">
			<div class="loader">
				<div class="loader-bar"></div>
			</div>
			<ngx-table *ngIf="!forceLoader"></ngx-table>
		</div>
		<div
			*ngIf="!forceLoader"
			footerStyle
			class="flexi-table-footer"
			[class.hide-table-footer-inner]="init && !init.footer"
		>
			<ngx-pager
				[init]="init"
				[records]="recordsCopy"
				[pageLimit]="init.pageLimit"
				[pageData]="pageData"
				(pagedRecordsChange)="updatePagedRecords($event)"
				(serverPageChange)="onPageChange.emit($event)"
			></ngx-pager>
		</div>
	`
})
export class NgxDatatableComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
	loadingSub: Subscription;
	recordsSub: Subscription;
	checkedRecordsSub: Subscription;
	filterRecordsSub: Subscription;
	initSetPageSub: Subscription;
	rowSelectionSub: Subscription;
	newTabSelectionSub: Subscription;
	serverFiltersSub: Subscription;
	sortedColumnSub: Subscription;

	@HostBinding('class.loading') loading = true;
	@HostBinding('class.flex') flex;
	@HostBinding('class.grid') grid;
	@HostBinding('class.theme-basic') themeBasic;
	@HostBinding('class.theme-qww-s') themeQwwS;

	@ViewChild(PagerComponent) private pagerComponent: PagerComponent;

	@Input() init: DT_Init;
	@Input() config: DT_ColumnConfig[];
	@Input() forceLoader: boolean = false;
	@Input() records: {}[];
	@Input() pageData: DT_ServerPageData;
	@Input() styles: DT_Styles;

	//GENERAL OUTPUTS
	@Output() onRowSelection: EventEmitter<{}>     = new EventEmitter();
	@Output() onCheckboxChange: EventEmitter<{}[]> = new EventEmitter();
	@Output() onNewTabSelection: EventEmitter<any> = new EventEmitter();

	//SERVER-SPECIFIC OUTPUTS
	@Output() onPageChange: EventEmitter<number> = new EventEmitter();
	@Output() onExportAll: EventEmitter<string>  = new EventEmitter();
	@Output() onFilterChange: EventEmitter<{}>   = new EventEmitter();
	@Output() onSort: EventEmitter<{}>           = new EventEmitter();

	clientSide: boolean = false;
	serverSide: boolean = false;
	serverSideInitCompleted: boolean = false;

	preventDetection: boolean = true;
	preventEmissions: boolean = false;

	recordsCopy: {}[];
	checkedRecords: {}[];
	pagedRecords: {}[];
	columns: DT_ColumnMap[];
	sortedColumn: {};

	constructor(
		public tableData: TableDataService,
		private cdr: ChangeDetectorRef
	) {
		this.loadingSub          = this.tableData.loading$.subscribe(loading =>
			this.loading = ((this.init && this.init.loader && loading) || !this.recordsCopy || this.forceLoader) ? true : false
		);
		this.recordsSub          = this.tableData.records$.subscribe(records => this.recordsCopy = records);
		this.filterRecordsSub    = this.tableData.filterRecordsSubject$.subscribe(filteredRecords => this.filterRecords(filteredRecords));
		this.initSetPageSub      = this.tableData.initSetPageSubject$.subscribe(() => this.initSetPage());
		this.rowSelectionSub     = this.tableData.rowSelection$.subscribe(row => this.onRowSelection.emit(row));
		this.newTabSelectionSub  = this.tableData.newTabSelection$.subscribe(newTab => this.onNewTabSelection.emit(newTab));
		this.serverFiltersSub    = this.tableData.serverFilters$.subscribe(serverFilters => {
			this.tableData.publishLoading(true);
			this.onFilterChange.emit(serverFilters);
		});
		this.sortedColumnSub     = this.tableData.sortedColumn$.subscribe(sortedColumn =>
			(this.serverSide) ? (this.sortedColumn = sortedColumn, this.onSort.emit(this.sortedColumn)) : null
		)
		this.checkedRecordsSub   = this.tableData.checkedRecords$.subscribe(checkedRecords => {
			this.checkedRecords  = checkedRecords;
			if (!this.preventEmissions) this.onCheckboxChange.emit(this.checkedRecords);
		});
	}

	ngOnChanges(changes: SimpleChanges) {
		(this.config)
			? this.columns = this.config.map(col => new DT_ColumnMap(col))
			: this.columns = Object.keys(changes['records'].currentValue[0]).map(key => new DT_ColumnMap({ primeKey: key }));

		this.tableData.publishColumns(this.columns);

		if (changes['records'] && changes['records'].previousValue)
			(this.init.server) ? this.afterViewInit(true) : this.reDeployTable();

		if (changes['records'] && !changes['records'].previousValue) this.reDeployTable();

		if (changes['forceLoader']) this.tableData.publishLoading(changes['forceLoader'].currentValue);
	}

	ngOnInit(): void { this.onInit() };
	onInit(): void {
		if (this.records)
		{
			if (!this.init) this.init = new DT_Init({});
			this.tableData.publishInit(this.init);
			this.tableData.publishStyles(this.styles);
			this.initStyles();
	
			(!this.init.server) ? this.clientSide = true : this.serverSide = true;
			
			this.recordsCopy = this.records;
			this.tableData.publishRecords(this.recordsCopy);
	
			this.preventEmissions = true;
			if (this.clientSide || !this.serverSideInitCompleted) this.tableData.publishCheckedRecords([]);
			this.preventEmissions = false;
	
			this.serverSideInitCompleted = true;
			this.preventDetection = false;
			this.cdr.detectChanges();
		}
	}

	ngAfterViewInit(): void { this.afterViewInit() };
	afterViewInit(updateRecords?: boolean): void {
		if (updateRecords)
		{
			this.recordsCopy = this.records;
			this.tableData.publishRecords(this.recordsCopy);
			this.cdr.detectChanges();
			this.initSetPage();
		}
		else if (this.records) this.initSetPage();
	}

	ngOnDestroy(): void {
		this.loadingSub.unsubscribe();
		this.recordsSub.unsubscribe();
		this.checkedRecordsSub.unsubscribe();
		this.filterRecordsSub.unsubscribe();
		this.initSetPageSub.unsubscribe();
		this.rowSelectionSub.unsubscribe();
		this.newTabSelectionSub.unsubscribe();
		this.serverFiltersSub.unsubscribe();
	}

	reDeployTable(): void {
		this.onInit();
		this.afterViewInit();
	}

	initStyles(): void {
		this.flex       = (this.styles && this.styles.template.layout === 'flex') ? true : false;
		this.grid       = (this.styles && this.styles.template.layout === 'grid') ? true : false;
		this.themeBasic = (this.styles && this.styles.template.theme === 'basic') ? true : false;
		this.themeQwwS = (this.styles && this.styles.template.theme === 'qww-s') ? true : false;
	}

	initSetPage(): void {
		(this.serverSide)
			? this.pagerComponent.setPage(this.pageData.currentPage, true)
			: this.pagerComponent.setPage(1, true);

		this.tableData.publishLoading(false);
		this.cdr.detectChanges();
	}

	filterRecords(filteredRecords: {}[]): void {
		this.recordsCopy = filteredRecords;
		this.tableData.publishLoading(true);
		this.tableData.publishRecords(filteredRecords);
		this.tableData.runIsAllChecked();
		this.cdr.detectChanges();
		this.initSetPage();
	}

	updatePagedRecords(newPagedRecords: {}[]): void {
		this.pagedRecords = newPagedRecords;
		this.tableData.publishPagedRecords(this.pagedRecords);
		this.tableData.publishLoading(false);
	}
}
