import { Component, ChangeDetectionStrategy, OnChanges, OnInit, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { ColumnMap } from '../../../models/column.model';
import { Init } from '../../../models/init.model';

import { ArrayService } from '../../../services/array.service';
import { FilterService } from '../../../services/filter.service';
import { TableDataService } from '../../../data/data.service';
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
	initSub: Subscription;
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

	serverSide: boolean;
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
		private arrayService: ArrayService,
		private cdr: ChangeDetectorRef,
		private filterService: FilterService,
		private sortService: SortService
	) {}

	ngOnChanges(): void {
		this.tableData.runIsAllChecked();
	}

	ngOnInit(): void {
		this.initSub            = this.tableData.init$.subscribe(init => {
			this.serverSide = init.server;
			if (init.filter.type.toLowerCase() === 'columns' && Array.isArray(init.filter.keys))
				this.columnFilters = init.filter.keys;
		});
		this.recordsSub         = this.tableData.records$.subscribe(records => this.records = records);
		this.checkedRecordsSub  = this.tableData.checkedRecords$.subscribe(checkedRecords => this.checkedRecords = checkedRecords);
		this.columnsSub         = this.tableData.columns$.subscribe(columns => this.columns = columns);
		this.serverFiltersSub   = this.tableData.serverFilters$.subscribe(serverFilters => this.serverFilters = serverFilters);
		this.sortedColumnSub    = this.tableData.sortedColumn$.subscribe(sortedColumn => this.sortedColumn = sortedColumn);
		this.isAllCheckedSub    = this.tableData.isAllCheckedSubject$.subscribe(() => this.isAllChecked());

		this.cachedRecords = this.records;
	}

	ngOnDestroy(): void {
		this.initSub.unsubscribe();
		this.recordsSub.unsubscribe();
		this.checkedRecordsSub.unsubscribe();
		this.columnsSub.unsubscribe();
		this.columnFiltersSub.unsubscribe();
		this.serverFiltersSub.unsubscribe();
		this.sortedColumnSub.unsubscribe();
		this.isAllCheckedSub.unsubscribe();
	}

	isAllChecked(): boolean {
		if  (
				(
					(this.serverSide) &&
					(this.records && this.checkedRecords) && 
					(this.records.length > 0) &&
					(this.arrayService.arrayIncludesAll([...this.records], [...this.checkedRecords], true))
				)
			||
				(
					(this.records && this.checkedRecords) &&
					(this.records.length > 0) &&
					(this.arrayService.arrayEquals([...this.records], [...this.checkedRecords], (!this.columnFilters) ? true : false)) ||
					(this.columnFilters && this.arrayService.arrayIncludesAll([...this.records], [...this.checkedRecords]))
				)
			)
		{
			if (!this.wasAllChecked) (this.wasAllChecked = true, this.cdr.markForCheck());
			return true;
		} 
		else
		{
			if (this.wasAllChecked) (this.wasAllChecked = false, this.cdr.markForCheck());
			return false;
		}
	}

	updateAll = (): void => (this.serverSide) ? this.serverUpdateAll() : this.clientUpdateAll();

	clientUpdateAll(): void {
		if	(
				this.arrayService.arrayIncludesAll([...this.checkedRecords], [...this.records]) &&
				(this.checkedRecords.length === this.records.length || this.checkedRecords.length > this.records.length)
			)
		{
			this.checkedRecords = this.checkedRecords.filter(
				(checkedRecord, i) => (this.records.indexOf(checkedRecord) === -1) ? true : false
			);
		}
		else if (this.arrayService.arrayIncludesAll([...this.records], [...this.checkedRecords]))
		{
			for (let i = 0; i < this.checkedRecords.length; i++)
				if (this.records.indexOf(this.checkedRecords[i]) > -1) (this.checkedRecords.splice(i, 1), i--);
		}
		else if	(
					this.checkedRecords.length === this.records.length ||
					this.checkedRecords.length > 0 && this.arrayService.arrayIncludesNone([...this.checkedRecords], [...this.records])
				)
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

		this.tableData.publishCheckedRecords(this.checkedRecords);
	}

	serverUpdateAll(): void {
		if	(
				this.arrayService.arrayIncludesAll([...this.checkedRecords], [...this.records], true) &&
				(this.checkedRecords.length === this.records.length || this.checkedRecords.length > this.records.length)
			)
		{
			this.checkedRecords = this.checkedRecords
				.filter((checkedRecord, i) => (this.arrayService.arrayIncludes(checkedRecord, this.records)) ? false : true);
		}
		else if (this.arrayService.arrayIncludesAll([...this.records], [...this.checkedRecords], true))
		{
			for (let i = 0; i < this.checkedRecords.length; i++)
				if (this.arrayService.arrayIncludes(this.checkedRecords[i], this.records))
					(this.checkedRecords.splice(i, 1), i--);
		}
		else if	(
					this.checkedRecords.length === this.records.length ||
					this.checkedRecords.length > 0 && this.arrayService.arrayIncludesNone([...this.checkedRecords], [...this.records], true)
				)
		{
			this.checkedRecords = this.checkedRecords.concat(this.records);
		}
		else if (this.checkedRecords.length > this.records.length)
		{
			for (let i = 0; i < this.records.length; i++)
				if (!this.arrayService.arrayIncludes(this.records[i], this.checkedRecords))
					this.checkedRecords.push(this.records[i]);
		}
		else
		{
			(!this.checkedRecords || this.checkedRecords.length != this.records.length)
				? this.checkedRecords = this.records.slice()
				: this.checkedRecords = [];
		}

		this.tableData.publishCheckedRecords(this.checkedRecords);
	}

	setFilterTimer(target: HTMLInputElement): void {
		if (this.timer) clearTimeout(this.timer);
			this.timer = setTimeout(() => this.setFilter(target, true), 1000);
	}

	setFilter(target: HTMLInputElement, serverBypassTimer: boolean = false): void {
		if (this.serverSide)
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
			const filteredRecords = this.filterService.filterRecords(
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

		if (!this.serverSide)
		{
			this.records = this.sortService.sortRecords(this.records, this.sortedColumn);

			this.tableData.publishRecords(this.records);
			this.tableData.publishSortedColumn(this.sortedColumn);
			this.tableData.runInitSetPage();
		}
		else this.tableData.publishSortedColumn(this.sortedColumn);
	}
}
