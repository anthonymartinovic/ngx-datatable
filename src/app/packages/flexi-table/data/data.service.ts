import { Injectable } from '@angular/core';
import { BehaviorSubject ,  Subject } from 'rxjs';

import { ColumnMap } from '../models/column.model';
import { Init } from '../models/init.model';
import { Styles } from '../models/styles.model';

@Injectable()
export class TableDataService {
	private loadingSource         = new BehaviorSubject<boolean>(false);
	private initSource            = new BehaviorSubject<Init>(undefined);
	private stylesSource          = new BehaviorSubject<Styles>(undefined);
	private recordsSource         = new BehaviorSubject<{}[]>(undefined);
	private checkedRecordsSource  = new BehaviorSubject<{}[]>(undefined);
	private pagedRecordsSource    = new BehaviorSubject<{}[]>(undefined);
	private columnsSource         = new BehaviorSubject<ColumnMap[]>(undefined);
	private columnFiltersSource   = new BehaviorSubject<string[]>(undefined);
	private serverFiltersSource   = new BehaviorSubject<{}[]>(undefined);
	private sortedColumnSource    = new BehaviorSubject<{ name: any, order: string }>(undefined);
	private newTabSelectionSource = new BehaviorSubject<any>(undefined);
	private rowSelectionSource    = new BehaviorSubject<{}>(undefined);
	private filterRecordsSubject  = new Subject<{}[]>();
	private initSetPageSubject    = new Subject();
	private isAllCheckedSubject   = new Subject();

	loading$                      = this.loadingSource.asObservable();
	init$                         = this.initSource.asObservable();
	styles$                       = this.stylesSource.asObservable();
	records$                      = this.recordsSource.asObservable();
	checkedRecords$               = this.checkedRecordsSource.asObservable();
	pagedRecords$                 = this.pagedRecordsSource.asObservable();
	columns$                      = this.columnsSource.asObservable();
	columnFilters$                = this.columnFiltersSource.asObservable();
	serverFilters$                = this.serverFiltersSource.asObservable();
	sortedColumn$                 = this.sortedColumnSource.asObservable();
	newTabSelection$              = this.newTabSelectionSource.asObservable();
	rowSelection$                 = this.rowSelectionSource.asObservable();
	filterRecordsSubject$         = this.filterRecordsSubject.asObservable();
	initSetPageSubject$           = this.initSetPageSubject.asObservable();
	isAllCheckedSubject$          = this.isAllCheckedSubject.asObservable();

	publishLoading                = (loading: boolean): void => this.loadingSource.next(loading);
	publishInit                   = (init: Init): void => this.initSource.next(init);
	publishStyles                 = (styles: Styles): void => this.stylesSource.next(styles);
	publishRecords                = (records: {}[]): void => this.recordsSource.next(records);
	publishCheckedRecords         = (checkedRecords: {}[]): void => this.checkedRecordsSource.next(checkedRecords);
	publishPagedRecords           = (pagedRecords: {}[]): void => this.pagedRecordsSource.next(pagedRecords);
	publishColumns                = (columns: ColumnMap[]): void => this.columnsSource.next(columns);
	publishColumnFilters          = (columnFilters: string[]): void => this.columnFiltersSource.next(columnFilters);
	publishServerFilters          = (serverFilters: {}[]): void => this.serverFiltersSource.next(serverFilters);
	publishSortedColumn           = (sortedColumn: { name: any, order: string }): void => this.sortedColumnSource.next(sortedColumn);
	publishNewTabSelection        = (newTabSelection: any): void => this.newTabSelectionSource.next(newTabSelection);
	publishRowSelection           = (row: {}): void => this.rowSelectionSource.next(row);
	runFilterRecords              = (filteredRecords: {}[]): void => this.filterRecordsSubject.next(filteredRecords);
	runInitSetPage                = (): void => this.initSetPageSubject.next();
	runIsAllChecked               = (): void => this.isAllCheckedSubject.next();
}
