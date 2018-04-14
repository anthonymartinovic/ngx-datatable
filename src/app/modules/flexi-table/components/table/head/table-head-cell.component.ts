import { Component, ChangeDetectionStrategy, OnChanges, OnInit, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ColumnMap } from '../../../models/column.model';

import { TableDataService } from '../table.data.service';
import { SortService } from '../../../services/sort.service';

@Component({
	selector: 'ngx-table-head-cell',
	host: { 'class': 'table-head-cell' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<ng-container *ngIf="headerType === 'standard'">
			<div class="head-cell-text" (click)="setSort(column)">{{value}}</div>
		</ng-container>
		<ng-container *ngIf="headerType === 'checkbox'">
			<div class="head-cell-checkbox-container" [flexiCellStyle]="'checkbox'">
				<input
					type="checkbox"
					class="header-cell-checkbox"
					[checked]="isAllChecked()" 
					(change)="updateAll()"
				/>
			</div>
		</ng-container>
		<ng-container *ngIf="headerType === 'newTab'">
			<div class="head-cell-text" [flexiCellStyle]="'newTab'">{{value}}</div>
		</ng-container>
	`,
})
export class TableHeadCellComponent implements OnChanges, OnInit, OnDestroy {
	recordsSub: Subscription;
	checkedRecordsSub: Subscription;
	sortedColumnSub: Subscription;
	isAllCheckedSub: Subscription;

	@Input() headerType: string;
	@Input() value: any;
	@Input() column: ColumnMap;

	records: {}[];
	checkedRecords: {}[];
	sortedColumn: {
		name: any,
		order: string
	}
	wasAllChecked: boolean = false;

	constructor(
		public tableData: TableDataService,
		private _cdr: ChangeDetectorRef,
		private _sortService: SortService
	) {}

	ngOnChanges(): void {
		this.tableData.runIsAllChecked();
	}

	ngOnInit(): void {
		this.recordsSub        = this.tableData.records$.subscribe(records => this.records = records);
		this.checkedRecordsSub = this.tableData.checkedRecords$.subscribe(checkedRecords => this.checkedRecords = checkedRecords);
		this.sortedColumnSub   = this.tableData.sortedColumn$.subscribe(sortedColumn => this.sortedColumn = sortedColumn);
		this.isAllCheckedSub   = this.tableData.isAllCheckedSubject$.subscribe(() => this.isAllChecked());
	}

	ngOnDestroy(): void {
		this.recordsSub.unsubscribe();
		this.checkedRecordsSub.unsubscribe();
		this.sortedColumnSub.unsubscribe();
		this.isAllCheckedSub.unsubscribe();
	}

	isAllChecked(): boolean {
		if ((this.records && this.checkedRecords) && (this.checkedRecords.length === this.records.length))
		{
			if (!this.wasAllChecked) (this.wasAllChecked = true, this._cdr.markForCheck());
			return true;
		} 
		else
		{
			if (this.wasAllChecked) (this.wasAllChecked = false, this._cdr.markForCheck());
			return false;
		}
	}

	updateAll(): void {
		(!this.checkedRecords || this.checkedRecords.length != this.records.length)
			? this.checkedRecords = this.records.slice()
			: this.checkedRecords = [];
		
		this.tableData.publishCheckedRecords(this.checkedRecords);
	}

	setSort(column: any): void {
		if (this.sortedColumn && this.sortedColumn.name === column.access(this.records[0]))
		{
			(this.sortedColumn.order === 'asc')
				? this.sortedColumn.order = 'desc'
				: this.sortedColumn.order = 'asc';
		}
		else {
			this.sortedColumn = {
				name: column.access(this.records[0]),
				order: 'asc'
			}
		}

		this.records = this._sortService.sortRecords(this.records, this.sortedColumn);

		this.tableData.publishRecords(this.records);
		this.tableData.publishSortedColumn(this.sortedColumn);
		this.tableData.runInitSetPage();
	}
}
