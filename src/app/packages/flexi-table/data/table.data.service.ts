import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

import { ColumnMap } from '../models/column.model';
import { StylesModel } from '../models/styles.model';

@Injectable()
export class TableDataService {
	private loadingSource         = new BehaviorSubject<boolean>(false);
	private columnsSource         = new BehaviorSubject<ColumnMap[]>(undefined);
	private columnFiltersSource   = new BehaviorSubject<string[]>(undefined);
	private recordsSource         = new BehaviorSubject<{}[]>(undefined);
	private checkedRecordsSource  = new BehaviorSubject<{}[]>(undefined);
	private pagedRecordsSource    = new BehaviorSubject<{}[]>(undefined);
	private selectableStateSource = new BehaviorSubject<boolean>(undefined);
	private checkboxStateSource   = new BehaviorSubject<boolean>(undefined);
	private newTabStateSource     = new BehaviorSubject<boolean>(undefined);
	private newTabCaptionSource   = new BehaviorSubject<string>(undefined);
	private newTabKeysSource      = new BehaviorSubject<string[]>(undefined);
	private newTabSelectionSource = new BehaviorSubject<any>(undefined);
	private sortedColumnSource    = new BehaviorSubject<{ name: any, order: string }>(undefined);
	private rowSelectionSource    = new BehaviorSubject<{}>(undefined);
	private groupBySource         = new BehaviorSubject<string[]>(undefined);
	private stylesSource          = new BehaviorSubject<StylesModel>(undefined);
	private filterRecordsSubject  = new Subject<{}[]>();
	private initSetPageSubject    = new Subject();
	private isAllCheckedSubject   = new Subject();

	loading$                      = this.loadingSource.asObservable();
	columns$                      = this.columnsSource.asObservable();
	columnFilters$                = this.columnFiltersSource.asObservable();
	records$                      = this.recordsSource.asObservable();
	checkedRecords$               = this.checkedRecordsSource.asObservable();
	pagedRecords$                 = this.pagedRecordsSource.asObservable();
	selectableState$              = this.selectableStateSource.asObservable();
	checkboxState$                = this.checkboxStateSource.asObservable();
	newTabState$                  = this.newTabStateSource.asObservable();
	newTabCaption$                = this.newTabCaptionSource.asObservable();
	newTabKeys$                   = this.newTabKeysSource.asObservable();
	newTabSelection$              = this.newTabSelectionSource.asObservable();
	sortedColumn$                 = this.sortedColumnSource.asObservable();
	rowSelection$                 = this.rowSelectionSource.asObservable();
	groupBy$                      = this.groupBySource.asObservable();
	styles$                       = this.stylesSource.asObservable();
	filterRecordsSubject$         = this.filterRecordsSubject.asObservable();
	initSetPageSubject$           = this.initSetPageSubject.asObservable();
	isAllCheckedSubject$          = this.isAllCheckedSubject.asObservable();

	publishLoading                = (loading: boolean): void => this.loadingSource.next(loading);
	publishColumns                = (columns: ColumnMap[]): void => this.columnsSource.next(columns);
	publishColumnFilters          = (columnFilters: string[]): void => this.columnFiltersSource.next(columnFilters);
	publishRecords                = (records: {}[]): void => this.recordsSource.next(records);
	publishCheckedRecords         = (checkedRecords: {}[]): void => this.checkedRecordsSource.next(checkedRecords);
	publishPagedRecords           = (pagedRecords: {}[]): void => this.pagedRecordsSource.next(pagedRecords);
	publishSelectableState        = (selectableState: boolean): void => this.selectableStateSource.next(selectableState);
	publishCheckboxState          = (checkboxState: boolean): void => this.checkboxStateSource.next(checkboxState);
	publishNewTabState            = (newTabState: boolean): void => this.newTabStateSource.next(newTabState);
	publishNewTabCaption          = (newTabCaption: string): void => this.newTabCaptionSource.next(newTabCaption);
	publishNewTabKeys             = (newTabKeys: string[]): void => this.newTabKeysSource.next(newTabKeys);
	publishNewTabSelection        = (newTabSelection: any): void => this.newTabSelectionSource.next(newTabSelection);
	publishSortedColumn           = (sortedColumn: { name: any, order: string }): void => this.sortedColumnSource.next(sortedColumn);
	publishRowSelection           = (row: {}): void => this.rowSelectionSource.next(row);
	publishGroupBy                = (groupings: string[]): void => this.groupBySource.next(groupings);
	publishStyles                 = (styles: StylesModel): void => this.stylesSource.next(styles);
	runFilterRecords              = (filteredRecords: {}[]): void => this.filterRecordsSubject.next(filteredRecords);
	runInitSetPage                = (): void => this.initSetPageSubject.next();
	runIsAllChecked               = (): void => this.isAllCheckedSubject.next();
}
