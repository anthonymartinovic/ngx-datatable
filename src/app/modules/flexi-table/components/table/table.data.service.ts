import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ColumnMap } from '../../models/column.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TableDataService {
	private columnsSource        = new BehaviorSubject<ColumnMap[]>(undefined);
	private recordsSource        = new BehaviorSubject<{}[]>(undefined);
	private checkedRecordsSource = new BehaviorSubject<{}[]>(undefined);
	private pagedRecordsSource   = new BehaviorSubject<{}[]>(undefined);
	private newTabCaptionSource  = new BehaviorSubject<string>(undefined);
	private sortedColumnSource   = new BehaviorSubject<{ name: any, order: string }>(undefined);
	private initSetPageSubject   = new Subject();
	private isAllCheckedSubject   = new Subject();

	columns$                     = this.columnsSource.asObservable();
	records$                     = this.recordsSource.asObservable();
	checkedRecords$              = this.checkedRecordsSource.asObservable();
	pagedRecords$                = this.pagedRecordsSource.asObservable();
	newTabCaption$               = this.newTabCaptionSource.asObservable();
	sortedColumn$                = this.sortedColumnSource.asObservable();
	initSetPageSubject$          = this.initSetPageSubject.asObservable();
	isAllCheckedSubject$         = this.isAllCheckedSubject.asObservable();
	
	constructor() {}

	publishColumns        = (columns: ColumnMap[]): void => this.columnsSource.next(columns);
	publishRecords        = (records: {}[]): void => this.recordsSource.next(records);
	publishCheckedRecords = (checkedRecords: {}[]): void => this.checkedRecordsSource.next(checkedRecords);
	publishPagedRecords   = (pagedRecords: {}[]): void => this.pagedRecordsSource.next(pagedRecords);
	publishNewTabCaption  = (newTabCaption: string): void => this.newTabCaptionSource.next(newTabCaption);
	publishSortedColumn   = (sortedColumn: { name: any, order: string }): void => this.sortedColumnSource.next(sortedColumn);
	runInitSetPage        = (): void => this.initSetPageSubject.next();
	runIsAllChecked       = (): void => this.isAllCheckedSubject.next();
	
}
