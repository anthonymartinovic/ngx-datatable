import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, OnInit, OnDestroy } from '@angular/core';

import { ColumnConfig, ColumnMap } from '../../models/column.model';

import { ImgService } from '../../services/img.service';
import { SortService } from '../../services/sort.service';
import { TableDataService } from './table.data.service';
import { Subscription } from 'rxjs/Subscription';

// <div class="ngx-table-body">
// 	<div 
// 		class="ngx-table-row"
// 		*ngFor="let record of pagedRecords"
// 	>
// 		<div 
// 			class="ngx-table-cell"
// 			*ngFor="let col of columns"
// 			[flexiCellStyle]="record[col.access(record)]"
// 		>
// 			{{ record[col.access(record)] | formatCell: col.format }}
// 		</div>
// 		<div
// 			class="ngx-table-cell"
// 			[flexiCellStyle]="'newTab'"
// 			[innerHTML]="imgService.getSVG('newTab')"
// 		></div>
// 		<div 
// 			class="ngx-table-cell"
// 			[flexiCellStyle]="'checkbox'">
// 			<input 
// 				type="checkbox" 
// 				[checked]="isChecked(record)" 
// 				(change)="update(record)"
// 		></div>
// 	</div>
// </div>

@Component({
	selector: 'ngx-table',
	host: { 'class': 'table' },
	template: `
		<caption *ngIf="caption" class="table-caption">{{ caption }}</caption>
		<ngx-table-head></ngx-table-head>
		<ngx-table-body>/ngx-table-body>
	`
})
export class TableComponent implements OnInit, OnChanges, OnDestroy {
	recordsSubscription: Subscription;
	checkedRecordsSub: Subscription;

	@Input() caption: string;
	@Input() newTabCaption: string;
	@Input() config: ColumnConfig[];
	@Input() records: {}[];

	@Output() afterSetSort = new EventEmitter();

	checkedRecords: {}[];
	columns: ColumnMap[];
	sortedColumn: {
		name: any,
		order: string
	}

	constructor(
		private _tableData: TableDataService,
		private _sortService: SortService,
		public imgService: ImgService
	) {
		this.checkedRecords = [];
	}

	ngOnInit() {
		this._tableData.publishRecords(this.records);
		this._tableData.publishCheckedRecords(this.checkedRecords);

		this.recordsSubscription = this._tableData.records$.subscribe(records => this.records = records);
		this.checkedRecordsSub   = this._tableData.checkedRecords$.subscribe(checkedRecords => this.checkedRecords = checkedRecords);
	}

	ngOnChanges() {
		console.log('yes');
		if (this.config) 
		{
			this.columns = this.config.map( 
				col => {
					return new ColumnMap(col) 
				}
			);
		} 
		else 
		{
			this.columns = Object.keys(this.records[0]).map(
				key => {
					return new ColumnMap({ primeKey: key });
				}
			);
		}

		this._tableData.publishColumns(this.columns);
	}

	ngOnDestroy() {
		this.recordsSubscription.unsubscribe();
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

		this._tableData.publishCheckedRecords(this.checkedRecords);
		this._tableData.runIsAllChecked();
	}
}
