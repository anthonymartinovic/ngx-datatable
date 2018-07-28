import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

import { DT_ColumnMap } from '../models/column.model';
import { DT_Init } from '../models/init.model';
import { DT_Styles } from '../models/styles.model';

@Injectable()
export class TableDataService {
	private loadingSource         = new BehaviorSubject<boolean>(false);
	private initSource            = new BehaviorSubject<DT_Init>(undefined);
	private stylesSource          = new BehaviorSubject<DT_Styles>(undefined);
	private recordsSource         = new BehaviorSubject<{}[]>(undefined);
	private checkedRecordsSource  = new BehaviorSubject<{}[]>(undefined);
	private pagedRecordsSource    = new BehaviorSubject<{}[]>(undefined);
	private columnsSource         = new BehaviorSubject<DT_ColumnMap[]>(undefined);
	private serverFiltersSource   = new BehaviorSubject<{}[]>(undefined);
	private sortedColumnSource    = new BehaviorSubject<{ name: any, order: string }>(undefined);
	private newTabSelectionSource = new BehaviorSubject<any>(undefined);
	private rowSelectionSource    = new BehaviorSubject<{}>(undefined);
	private filterRecordsSubject  = new Subject<{}[]>();
	private initSetPageSubject    = new Subject();
	private isAllCheckedSubject   = new Subject();

	loading$: Observable<any>              = this.loadingSource.asObservable();
	init$: Observable<any>                 = this.initSource.asObservable();
	styles$: Observable<any>               = this.stylesSource.asObservable();
	records$: Observable<any>              = this.recordsSource.asObservable();
	checkedRecords$: Observable<any>       = this.checkedRecordsSource.asObservable();
	pagedRecords$: Observable<any>         = this.pagedRecordsSource.asObservable();
	columns$: Observable<any>              = this.columnsSource.asObservable();
	serverFilters$: Observable<any>        = this.serverFiltersSource.asObservable();
	sortedColumn$: Observable<any>         = this.sortedColumnSource.asObservable();
	newTabSelection$: Observable<any>      = this.newTabSelectionSource.asObservable();
	rowSelection$: Observable<any>         = this.rowSelectionSource.asObservable();
	filterRecordsSubject$: Observable<any> = this.filterRecordsSubject.asObservable();
	initSetPageSubject$: Observable<any>   = this.initSetPageSubject.asObservable();
	isAllCheckedSubject$: Observable<any>  = this.isAllCheckedSubject.asObservable();

	publishLoading         = (loading: boolean): void => this.loadingSource.next(loading);
	publishInit            = (init: DT_Init): void => this.initSource.next(init);
	publishStyles          = (styles: DT_Styles): void => this.stylesSource.next(styles);
	publishRecords         = (records: {}[]): void => this.recordsSource.next(records);
	publishCheckedRecords  = (checkedRecords: {}[]): void => this.checkedRecordsSource.next(checkedRecords);
	publishPagedRecords    = (pagedRecords: {}[]): void => this.pagedRecordsSource.next(pagedRecords);
	publishColumns         = (columns: DT_ColumnMap[]): void => this.columnsSource.next(columns);
	publishServerFilters   = (serverFilters: {}[]): void => this.serverFiltersSource.next(serverFilters);
	publishSortedColumn    = (sortedColumn: { name: any, order: string }): void => this.sortedColumnSource.next(sortedColumn);
	publishNewTabSelection = (newTabSelection: any): void => this.newTabSelectionSource.next(newTabSelection);
	publishRowSelection    = (row: {}): void => this.rowSelectionSource.next(row);
	runFilterRecords       = (filteredRecords: {}[]): void => this.filterRecordsSubject.next(filteredRecords);
	runInitSetPage         = (): void => this.initSetPageSubject.next();
	runIsAllChecked        = (): void => this.isAllCheckedSubject.next();
}
