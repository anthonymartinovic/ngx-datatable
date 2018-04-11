import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { TableDataService } from './table.data.service';
import { Subscription } from 'rxjs/Subscription';
import { SortService } from '../../services/sort.service';
import { FlexiTableComponent } from '../../ngx-flexi-table.component';
import { ColumnMap } from '../../models/column.model';

@Component({
	selector: 'app-table-header',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<ng-container *ngIf="headerType === 'standard'">
			<div class="app-table-header-cell" (click)="setSort(column)">
				{{value}}
			</div>
		</ng-container>
		<ng-container *ngIf="headerType === 'checkbox'">
			<div class="app-table-header-cell" [flexiCellStyle]="'checkbox'">
				<input
					type="checkbox"
					[checked]="isAllChecked()" 
					(change)="updateAll()">
				>
			</div>
		</ng-container>
		<ng-container *ngIf="headerType === 'router'">
			<div class="app-table-header-cell">{{value}}</div>
		</ng-container>
	`,
})
export class TableHeaderComponent implements OnInit, OnDestroy {
	@ViewChild(FlexiTableComponent) private _ftc: FlexiTableComponent;

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
		private _cdr: ChangeDetectorRef,
		private _data: TableDataService,
		private _sortService: SortService
	) {}

	ngOnInit(): void {
		this.recordsSub        = this._data.records$.subscribe(records => this.records = records);
		this.checkedRecordsSub = this._data.checkedRecords$.subscribe(checkedRecords => this.checkedRecords = checkedRecords);
		this.sortedColumnSub   = this._data.sortedColumn$.subscribe(sortedColumn => this.sortedColumn = sortedColumn);
		this.isAllCheckedSub   = this._data.isAllCheckedSubject$.subscribe(() => this.isAllChecked());
	}

	ngOnDestroy(): void {
		this.recordsSub.unsubscribe();
		this.checkedRecordsSub.unsubscribe();
		this.sortedColumnSub.unsubscribe();
		this.isAllCheckedSub.unsubscribe();
	}

	isAllChecked(): boolean {
		if ((this.records && this.checkedRecords) && (this.checkedRecords.length === this.records.length)) {
			if (!this.wasAllChecked) (this.wasAllChecked = true, this._cdr.markForCheck());
			return true;
		} else {
			if (this.wasAllChecked) (this.wasAllChecked = false, this._cdr.markForCheck());
			return false;
		}
	}

	updateAll(): void {
		(!this.checkedRecords || this.checkedRecords.length != this.records.length)
			? this.checkedRecords = this.records.slice()
			: this.checkedRecords = [];
		
		this._data.publishCheckedRecords(this.checkedRecords);
	}

	setSort(column: any) {
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

		this._data.publishRecords(this.records);
		this._data.publishSortedColumn(this.sortedColumn);
		this._data.runInitSetPage();
	}
}
