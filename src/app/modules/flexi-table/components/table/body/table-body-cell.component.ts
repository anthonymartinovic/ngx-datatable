import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ColumnMap } from '../../../models/column.model';

import { ImgService } from '../../../services/img.service';
import { TableDataService } from '../table.data.service';

@Component({
	selector: 'ngx-table-body-cell',
	host: { 'class': 'table-body-cell' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<ng-container *ngIf="dataType === 'standard'">
			<div class="ngx-table-cell" [flexiCellStyle]="value[column.access(value)]">
				{{ value[column.access(value)] | formatCell: column.format }}
			</div>
		</ng-container>
		<ng-container *ngIf="dataType === 'newTab'">
			<div
				class="ngx-table-cell"
				[flexiCellStyle]="'newTab'"
				[innerHTML]="imgService.getSVG('newTab')"
			></div>
		</ng-container>
		<ng-container *ngIf="dataType === 'checkbox'">
		<div 
			class="ngx-table-cell"
			[flexiCellStyle]="'checkbox'"
		>
			<input 
				type="checkbox" 
				[checked]="isChecked(value)" 
				(change)="update(value)"
			>
		</div>
		</ng-container>
	`
})
export class TableBodyCellComponent implements OnInit, OnDestroy {
	recordsSub: Subscription;
	checkedRecordsSub: Subscription;

	records: {}[];
	checkedRecords: {}[];

	@Input() dataType: string;
	@Input() value: {};
	@Input() column: ColumnMap;

	constructor(
		private _cdr: ChangeDetectorRef,
		public imgService: ImgService,
		public tableData: TableDataService
	) {}

	ngOnInit(): void {
		this.recordsSub = this.tableData.records$.subscribe(records => {
			this.records = records;
			this._cdr.markForCheck();
		});
		this.checkedRecordsSub = this.tableData.checkedRecords$.subscribe(checkedRecords => { 
			this.checkedRecords = checkedRecords;
			this._cdr.markForCheck();
		});
	}

	ngOnDestroy(): void {
		this.recordsSub.unsubscribe();
		this.checkedRecordsSub.unsubscribe();
	}

	isChecked(record): boolean {
		return (this.checkedRecords.indexOf(record) > -1)
			? true
			: false;
	}

	update(record): void {
		let index = this.checkedRecords.indexOf(record);
		
		(index > -1)
			? this.checkedRecords.splice(index, 1)
			: this.checkedRecords.push(record);

		this.tableData.publishCheckedRecords(this.checkedRecords);
		this.tableData.runIsAllChecked();
	}
}
