import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, OnInit, OnDestroy } from '@angular/core';

import { ColumnConfig, ColumnMap } from '../../models/column.model';

import { ImgService } from '../../services/img.service';
import { SortService } from '../../services/sort.service';
import { TableDataService } from './table.data.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-table',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="table">
			<caption *ngIf="caption">{{ caption }}</caption>
			<app-table-head></app-table-head>
			<div class="app-table-body">
				<div 
					class="app-table-row"
					*ngFor="let record of pagedRecords">
					<div 
						class="app-table-cell"
						*ngFor="let col of columns"
						[flexiCellStyle]="record[col.access(record)]"
					>
						{{ record[col.access(record)] | formatCell: col.format }}
					</div>
					<div 
						class="app-table-cell"
						class="flexi-new-tab-container"
						[flexiCellStyle]="'newTab'"
						[innerHTML]="imgService.getSVG('newTab')"
					></div>
					<div 
						class="app-table-cell"
						[flexiCellStyle]="'checkbox'">
						<input 
							type="checkbox" 
							[checked]="isChecked(record)" 
							(change)="update(record)"
					></div>
				</div>
			</div>
		</div>
	`
})
export class TableComponent implements OnInit, OnChanges, OnDestroy {
	recordsSubscription: Subscription;
	checkedRecordsSub: Subscription;

	@Input() caption: string;
	@Input() routerCaption: string;
	@Input() config: ColumnConfig[];
	@Input() records: {}[];
	@Input() pagedRecords: {}[];

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
		this._tableData.publishRouterCaption(this.routerCaption);
		this._tableData.publishCheckedRecords(this.checkedRecords);

		this.recordsSubscription = this._tableData.records$.subscribe(records => this.records = records);
		this.checkedRecordsSub   = this._tableData.checkedRecords$.subscribe(checkedRecords => this.checkedRecords = checkedRecords);
	}

	ngOnChanges() {
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
