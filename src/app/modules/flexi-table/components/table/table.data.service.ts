import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ColumnMap } from '../../models/column.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TableDataService {
	private columnsSource        = new BehaviorSubject<ColumnMap[]>(undefined);
	private recordsSource        = new BehaviorSubject<{}[]>(undefined);
	private checkedRecordsSource = new BehaviorSubject<{}[]>(undefined);
	private routerCaptionSource  = new BehaviorSubject<string>(undefined);
	private sortedColumnSource   = new BehaviorSubject<{ name: any, order: string }>(undefined);
	private initSetPageSubject   = new Subject();
	private isAllCheckedSubject   = new Subject();

	columns$                     = this.columnsSource.asObservable();
	records$                     = this.recordsSource.asObservable();
	checkedRecords$              = this.checkedRecordsSource.asObservable();
	routerCaption$               = this.routerCaptionSource.asObservable();
	sortedColumn$                = this.sortedColumnSource.asObservable();
	initSetPageSubject$          = this.initSetPageSubject.asObservable();
	isAllCheckedSubject$         = this.isAllCheckedSubject.asObservable();
	
	constructor() {}

	publishColumns        = (columns: ColumnMap[]): void => this.columnsSource.next(columns);
	publishRecords        = (records: {}[]): void => this.recordsSource.next(records);
	publishCheckedRecords = (checkedRecords: {}[]): void => this.checkedRecordsSource.next(checkedRecords);
	publishRouterCaption  = (routerCaption: string): void => this.routerCaptionSource.next(routerCaption);
	publishSortedColumn   = (sortedColumn: { name: any, order: string }): void => this.sortedColumnSource.next(sortedColumn);
	runInitSetPage        = (): void => this.initSetPageSubject.next();
	runIsAllChecked       = (): void => this.isAllCheckedSubject.next();
	
}
