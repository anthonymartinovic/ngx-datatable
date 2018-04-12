import { Component, OnInit, Input } from '@angular/core';
import { ColumnMap } from '../../../models/column.model';
import { ImgService } from '../../../services/img.service';
import { TableDataService } from '../table.data.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'ngx-table-data',
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
export class TableDataComponent implements OnInit {
	recordsSubscription: Subscription;
	checkedRecordsSub: Subscription;

	@Input() dataType: string;
	@Input() value: {};
	@Input() column: ColumnMap;

	records: {}[];
	checkedRecords: {}[];

	constructor(
		private _tableData: TableDataService,
		public imgService: ImgService
	) {}

	ngOnInit() {
		this.recordsSubscription = this._tableData.records$.subscribe(records => this.records = records);
		this.checkedRecordsSub   = this._tableData.checkedRecords$.subscribe(checkedRecords => this.checkedRecords = checkedRecords);
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

		this._tableData.publishCheckedRecords(this.checkedRecords);
		this._tableData.runIsAllChecked();
	}
}
