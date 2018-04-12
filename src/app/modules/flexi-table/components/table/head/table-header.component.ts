import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { TableDataService } from '../table.data.service';
import { Subscription } from 'rxjs/Subscription';
import { SortService } from '../../../services/sort.service';
import { FlexiTableComponent } from '../../../ngx-flexi-table.component';
import { ColumnMap } from '../../../models/column.model';

@Component({
	selector: 'ngx-table-header',
	host: { 'class': 'table-header' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<ng-container *ngIf="headerType === 'standard'">
			<ngx-table-header-cell 
				[headerType]="'standard'"
				[value]="value"
				(click)="setSort(column)"
			></ngx-table-header-cell>
		</ng-container>
		<ng-container *ngIf="headerType === 'checkbox'">
			<ngx-table-header-cell [headerType]="'checkbox'"></ngx-table-header-cell>
		</ng-container>
		<ng-container *ngIf="headerType === 'newTab'">
			<ngx-table-header-cell [headerType]="'newTab'" [value]="value"></ngx-table-header-cell>
		</ng-container>
	`,
})
export class TableHeaderComponent implements OnInit, OnDestroy {
	recordsSub: Subscription;
	sortedColumnSub: Subscription;

	@Input() headerType: string;
	@Input() value: any;
	@Input() column: ColumnMap;

	records: {}[];
	sortedColumn: {
		name: any,
		order: string
	}

	constructor(
		private _cdr: ChangeDetectorRef,
		private _tableData: TableDataService,
		private _sortService: SortService
	) {}

	ngOnInit(): void {
		this.recordsSub        = this._tableData.records$.subscribe(records => this.records = records);
		this.sortedColumnSub   = this._tableData.sortedColumn$.subscribe(sortedColumn => this.sortedColumn = sortedColumn);
	}

	ngOnDestroy(): void {
		this.recordsSub.unsubscribe();
		this.sortedColumnSub.unsubscribe();
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

		this._tableData.publishRecords(this.records);
		this._tableData.publishSortedColumn(this.sortedColumn);
		this._tableData.runInitSetPage();
	}
}
