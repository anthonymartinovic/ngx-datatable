import { Component, ChangeDetectionStrategy, OnChanges, OnInit, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ColumnMap } from '../../../models/column.model';
import { TableInit } from '../../../models/table-init.model';

import { ArrayComparatorService } from '../../../services/array-comparator.service';
import { FilterService } from '../../../services/filter.service';
import { TableDataService } from '../../../data/table.data.service';
import { SortService } from '../../../services/sort.service';

@Component({
	selector: 'ngx-table-head-cell',
	host: { 'class': 'table-head-cell' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<ng-container *ngIf="headerType === 'standard'">
			<div class="head-cell column-filter-container input-container" (click)="setSort(column)">{{value}}</div>
			<input
				*ngIf="columnFilters && columnFilters.includes(value)"
				type="text"
				class="column-filter input"
				placeholder="Search..."
				(keyup)="setFilter($event.target)"
			/>
		</ng-container>
		<ng-container *ngIf="headerType === 'checkbox'">
			<div class="head-cell checkbox-container" [cellStyle]="'checkbox'">
				<input
					type="checkbox"
					class="checkbox"
					[disabled]="records.length === 0"
					[checked]="isAllChecked()" 
					(change)="updateAll()"
				/>
			</div>
		</ng-container>
		<ng-container *ngIf="headerType === 'newTab'">
			<div class="head-cell text" [cellStyle]="'newTab'">{{value}}</div>
		</ng-container>
		<ng-container *ngIf="headerType === 'rowDetail'">
			<div class="head-cell text" [cellStyle]="'rowDetail'"></div>
		</ng-container>
	`,
})
export class TableHeadCellComponent implements OnChanges, OnInit, OnDestroy {
	serverSideStateSub: Subscription;
	recordsSub: Subscription;
	checkedRecordsSub: Subscription;
	columnsSub: Subscription;
	columnFiltersSub: Subscription;
	serverFiltersSub: Subscription;
	sortedColumnSub: Subscription;
	isAllCheckedSub: Subscription;

	@Input() headerType: string;
	@Input() value: any;
	@Input() column: ColumnMap;

	serverSideState: boolean;
	columns: ColumnMap[];
	columnFilters: string[];
	serverFilters: {}[];
	records: {}[];
	cachedRecords: {}[];
	checkedRecords: {}[];
	sortedColumn: {
		name: any,
		order: string
	}
	wasAllChecked: boolean = false;
	timer: any = null;

	constructor(
		public tableData: TableDataService,
		private _arrayComparator: ArrayComparatorService,
		private _cdr: ChangeDetectorRef,
		private _filterService: FilterService,
		private _sortService: SortService
	) {}

	ngOnChanges(): void {
		this.tableData.runIsAllChecked();
	}

	ngOnInit(): void {
		this.serverSideStateSub = this.tableData.serverSideState$.subscribe(sss => this.serverSideState = sss);
		this.recordsSub         = this.tableData.records$.subscribe(records => this.records = records);
		this.checkedRecordsSub  = this.tableData.checkedRecords$.subscribe(checkedRecords => this.checkedRecords = checkedRecords);
		this.columnsSub         = this.tableData.columns$.subscribe(columns => this.columns = columns);
		this.columnFiltersSub   = this.tableData.columnFilters$.subscribe(columnFilters => this.columnFilters = columnFilters);
		this.serverFiltersSub   = this.tableData.serverFilters$.subscribe(serverFilters => this.serverFilters = serverFilters);
		this.sortedColumnSub    = this.tableData.sortedColumn$.subscribe(sortedColumn => this.sortedColumn = sortedColumn);
		this.isAllCheckedSub    = this.tableData.isAllCheckedSubject$.subscribe(() => this.isAllChecked());

		this.cachedRecords = this.records;
	}

	ngOnDestroy(): void {
		this.serverSideStateSub.unsubscribe();
		this.recordsSub.unsubscribe();
		this.checkedRecordsSub.unsubscribe();
		this.columnsSub.unsubscribe();
		this.columnFiltersSub.unsubscribe();
		this.serverFiltersSub.unsubscribe();
		this.sortedColumnSub.unsubscribe();
		this.isAllCheckedSub.unsubscribe();
	}

	isAllChecked(): boolean {
		if (this.serverSideState && this._arrayComparator.arrayIncludesAll([...this.records], [...this.checkedRecords], true)) return true;

		if  (
				(this.records && this.checkedRecords) && 
				(this.records.length > 0) &&
				(this._arrayComparator.arrayEquals([...this.records], [...this.checkedRecords], (!this.columnFilters) ? true : false)) ||
				(this.columnFilters && this._arrayComparator.arrayIncludesAll([...this.records], [...this.checkedRecords]))
			)
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
		if (this.serverSideState)
		{
			if (this.serverSideState && this._arrayComparator.arrayIncludesAll([...this.records], [...this.checkedRecords]), true)
			{
				this.checkedRecords = this.checkedRecords.filter(
					(checkedRecord, i) => {
						const recordCheck = this.records.find(record =>
							(JSON.stringify(record) === JSON.stringify(checkedRecord)) ? true : false);
						return (recordCheck) ? false : true;
					}
				);
			}
			else
			{
				(!this.checkedRecords || this.checkedRecords.length != this.records.length)
					? this.checkedRecords = this.records.slice()
					: this.checkedRecords = [];
			}
		}
		else
		{
			if  (this._arrayComparator.arrayIncludesAll([...this.checkedRecords], [...this.records]) &&
				 (this.checkedRecords.length === this.records.length || this.checkedRecords.length > this.records.length))
			{
				this.checkedRecords = this.checkedRecords.filter(
					(checkedRecord, i) => (this.records.indexOf(checkedRecord) === -1) ? true : false
				);
			}
			else if (this._arrayComparator.arrayIncludesAll([...this.records], [...this.checkedRecords]))
			{
				for (let i = 0; i < this.checkedRecords.length; i++)
					if (this.records.indexOf(this.checkedRecords[i]) > -1) (this.checkedRecords.splice(i, 1), i--);
			}
			else if (this.checkedRecords.length === this.records.length ||
					 this.checkedRecords.length > 0 && this._arrayComparator.arrayIncludesNone([...this.checkedRecords], [...this.records]))
			{
				this.checkedRecords = this.checkedRecords.concat(this.records);
			}
			else if (this.checkedRecords.length > this.records.length)
			{
				for (let i = 0; i < this.records.length; i++)
					if (this.checkedRecords.indexOf(this.records[i]) === -1) this.checkedRecords.push(this.records[i]);
			}
			else
			{
				(!this.checkedRecords || this.checkedRecords.length != this.records.length)
					? this.checkedRecords = this.records.slice()
					: this.checkedRecords = [];
			}
		}

		this.tableData.publishCheckedRecords(this.checkedRecords);
	}

	setFilterTimer(target: HTMLInputElement): void {
		if (this.timer) clearTimeout(this.timer);
			this.timer = setTimeout(() => this.setFilter(target, true), 1000);
	}

	setFilter(target: HTMLInputElement, serverBypassTimer: boolean = false): void {
		if (this.serverSideState)
		{
			if (!serverBypassTimer) return this.setFilterTimer(target);

			if (!this.serverFilters) this.serverFilters = [];
			const keyCheck = this.serverFilters.find(filter => filter['key'] === this.column.access(this.value, true));
			this.serverFilters.forEach(filter => filter['latestInput'] = false);

			if (keyCheck)
			{
				if (keyCheck['value'] != target.value)
				{
					const updateIndex = this.serverFilters.indexOf(keyCheck);
					this.serverFilters[updateIndex] = {
						key: this.column.access(this.value, true),
						value: target.value,
						latestInput: true
					};
					this.tableData.publishServerFilters(this.serverFilters);
				}
			}
			else
			{
				this.serverFilters.push({
					key: this.column.access(this.value, true),
					value: target.value,
					latestInput: true
				});
				this.tableData.publishServerFilters(this.serverFilters);
			}
		}
		else
		{
			const filteredRecords = this._filterService.filterRecords(
				target.value.toLowerCase(), 
				this.column.primeKey, 
				this.columns, 
				this.cachedRecords
			);
	
			this.tableData.runFilterRecords(filteredRecords);
		}
	}

	setSort(column: ColumnMap): void {
		(this.sortedColumn && this.sortedColumn.name === column.access(this.records[0], true))
			? this.sortedColumn.order = (this.sortedColumn.order === 'asc') ? 'desc' : 'asc'
			: this.sortedColumn = { name: column.access(this.records[0], true), order: 'asc' };

		this.records = this._sortService.sortRecords(this.records, this.sortedColumn);

		this.tableData.publishRecords(this.records);
		this.tableData.publishSortedColumn(this.sortedColumn);
		this.tableData.runInitSetPage();
	}
}
