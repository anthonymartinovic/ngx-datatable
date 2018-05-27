import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

import { ColumnMap } from '../models/column.model';
import { StylesModel } from '../models/styles.model';

@Injectable()
export class TableDataService {
/*
|----------------------------------------------------------------------------------------------------------------------------
| General Sources
|----------------------------------------------------------------------------------------------------------------------------
*/
	private loadingSource         = new BehaviorSubject<boolean>(false);
	private columnsSource         = new BehaviorSubject<ColumnMap[]>(undefined);
	private columnFiltersSource   = new BehaviorSubject<string[]>(undefined);
	private serverFiltersSource   = new BehaviorSubject<{}[]>(undefined);
	private recordsSource         = new BehaviorSubject<{}[]>(undefined);
	private checkedRecordsSource  = new BehaviorSubject<{}[]>(undefined);
	private pagedRecordsSource    = new BehaviorSubject<{}[]>(undefined);
	private newTabSelectionSource = new BehaviorSubject<any>(undefined);
	private sortedColumnSource    = new BehaviorSubject<{ name: any, order: string }>(undefined);
	private rowSelectionSource    = new BehaviorSubject<{}>(undefined);
	private groupBySource         = new BehaviorSubject<string[]>(undefined);
	private stylesSource          = new BehaviorSubject<StylesModel>(undefined);
	private pageDataSource        = new BehaviorSubject<{}>(undefined);
	private filterRecordsSubject  = new Subject<{}[]>();
	private initSetPageSubject    = new Subject();
	private isAllCheckedSubject   = new Subject();
/*
|----------------------------------------------------------------------------------------------------------------------------
| Init Sources
|----------------------------------------------------------------------------------------------------------------------------
*/
	private serverSideStateSource = new BehaviorSubject<boolean>(false);
	private selectableStateSource = new BehaviorSubject<boolean>(false);
	private checkboxStateSource   = new BehaviorSubject<boolean>(false);
	private rowDetailStateSource  = new BehaviorSubject<boolean>(false);
	private newTabStateSource     = new BehaviorSubject<boolean>(false);
	private newTabCaptionSource   = new BehaviorSubject<string>(undefined);
	private newTabKeysSource      = new BehaviorSubject<string[]>(undefined);
/*
|----------------------------------------------------------------------------------------------------------------------------
| General Observables
|----------------------------------------------------------------------------------------------------------------------------
*/
	loading$                      = this.loadingSource.asObservable();
	columns$                      = this.columnsSource.asObservable();
	columnFilters$                = this.columnFiltersSource.asObservable();
	serverFilters$                = this.serverFiltersSource.asObservable();
	records$                      = this.recordsSource.asObservable();
	checkedRecords$               = this.checkedRecordsSource.asObservable();
	pagedRecords$                 = this.pagedRecordsSource.asObservable();
	newTabSelection$              = this.newTabSelectionSource.asObservable();
	sortedColumn$                 = this.sortedColumnSource.asObservable();
	rowSelection$                 = this.rowSelectionSource.asObservable();
	groupBy$                      = this.groupBySource.asObservable();
	styles$                       = this.stylesSource.asObservable();
	pageData$                     = this.pageDataSource.asObservable();
	filterRecordsSubject$         = this.filterRecordsSubject.asObservable();
	initSetPageSubject$           = this.initSetPageSubject.asObservable();
	isAllCheckedSubject$          = this.isAllCheckedSubject.asObservable();
/*
|----------------------------------------------------------------------------------------------------------------------------
| Init Observables
|----------------------------------------------------------------------------------------------------------------------------
*/
	serverSideState$              = this.serverSideStateSource.asObservable();
	selectableState$              = this.selectableStateSource.asObservable();
	checkboxState$                = this.checkboxStateSource.asObservable();
	rowDetailState$               = this.rowDetailStateSource.asObservable();
	newTabState$                  = this.newTabStateSource.asObservable();
	newTabCaption$                = this.newTabCaptionSource.asObservable();
	newTabKeys$                   = this.newTabKeysSource.asObservable();
/*
|----------------------------------------------------------------------------------------------------------------------------
| General Publishers
|----------------------------------------------------------------------------------------------------------------------------
*/
	publishLoading                = (loading: boolean): void => this.loadingSource.next(loading);
	publishColumns                = (columns: ColumnMap[]): void => this.columnsSource.next(columns);
	publishColumnFilters          = (columnFilters: string[]): void => this.columnFiltersSource.next(columnFilters);
	publishServerFilters          = (serverFilters: {}[]): void => this.serverFiltersSource.next(serverFilters);
	publishRecords                = (records: {}[]): void => this.recordsSource.next(records);
	publishCheckedRecords         = (checkedRecords: {}[]): void => this.checkedRecordsSource.next(checkedRecords);
	publishPagedRecords           = (pagedRecords: {}[]): void => this.pagedRecordsSource.next(pagedRecords);
	publishNewTabSelection        = (newTabSelection: any): void => this.newTabSelectionSource.next(newTabSelection);
	publishSortedColumn           = (sortedColumn: { name: any, order: string }): void => this.sortedColumnSource.next(sortedColumn);
	publishRowSelection           = (row: {}): void => this.rowSelectionSource.next(row);
	publishGroupBy                = (groupings: string[]): void => this.groupBySource.next(groupings);
	publishStyles                 = (styles: StylesModel): void => this.stylesSource.next(styles);
	publishPageData               = (pageData: {}): void => this.pageDataSource.next(pageData);
	runFilterRecords              = (filteredRecords: {}[]): void => this.filterRecordsSubject.next(filteredRecords);
	runInitSetPage                = (): void => this.initSetPageSubject.next();
	runIsAllChecked               = (): void => this.isAllCheckedSubject.next();
/*
|----------------------------------------------------------------------------------------------------------------------------
| Init Publishers
|----------------------------------------------------------------------------------------------------------------------------
*/
	publishServerSideState        = (serverSideState: boolean): void => this.serverSideStateSource.next(serverSideState);
	publishSelectableState        = (selectableState: boolean): void => this.selectableStateSource.next(selectableState);
	publishCheckboxState          = (checkboxState: boolean): void => this.checkboxStateSource.next(checkboxState);
	publishRowDetailState         = (rowDetailState: boolean): void => this.rowDetailStateSource.next(rowDetailState);
	publishNewTabState            = (newTabState: boolean): void => this.newTabStateSource.next(newTabState);
	publishNewTabCaption          = (newTabCaption: string): void => this.newTabCaptionSource.next(newTabCaption);
	publishNewTabKeys             = (newTabKeys: string[]): void => this.newTabKeysSource.next(newTabKeys);
}
