import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';

import { ColumnConfig, ColumnMap } from '../../models/column.model';

import { ImgService } from '../../services/img.service';
import { SortService } from '../../services/sort.service';

@Component({
	selector: 'app-table',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<table>
			<caption *ngIf="caption">{{ caption }}</caption>
			<thead>
				<tr>
					<th *ngFor="let col of columns"
						(click)="setSort(col)"
					>
						{{ col.header }}
					</th>
					<th>{{ routerCaption }}</th>
					<th [flexiCellStyle]="'checkbox'">
						<input 
							type="checkbox" 
							[checked]="isAllChecked()" 
							(change)="updateAll()"
						>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr *ngFor="let record of pagedRecords">
					<td 
						*ngFor="let col of columns"
						[flexiCellStyle]="record[col.access(record)]"
					>
						{{ record[col.access(record)] | formatCell: col.format }}
					</td>
					<td 
						class="flexi-new-tab-container"
						[flexiCellStyle]="'newTab'"
						[innerHTML]="imgService.getSVG('newTab')"
					>
					</td>
					<td [flexiCellStyle]="'checkbox'">
						<input 
							type="checkbox" 
							[checked]="isChecked(record)" 
							(change)="update(record)"
						>
					</td>
				</tr>
			</tbody>
		</table>
	`
})
export class TableComponent implements OnChanges {
	@Input() caption: string;
	@Input() routerCaption: string;
	@Input() config: ColumnConfig[];
	@Input() records: any[];
	@Input() pagedRecords: {}[];

	@Output() afterSetSort = new EventEmitter();

	checkedRecords: any[] = [];
	columns: ColumnMap[];
	sortedColumn: {
		name: any,
		order: string
	}

	constructor(
		private _sortService: SortService,
		public imgService: ImgService
	) {}

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
	}

	isChecked(record): boolean {
		return (this.checkedRecords.indexOf(record) > -1)
			? true
			: false;
	}

	isAllChecked(): boolean {
		return (this.checkedRecords.length === this.records.length)
			? true
			: false;
	}

	update(record): void {
		let index = this.checkedRecords.indexOf(record);
		
		(index > -1)
			? this.checkedRecords.splice(index, 1)
			: this.checkedRecords.push(record);
	}

	updateAll(): void {
		(this.checkedRecords.length != this.records.length)
			? this.checkedRecords = this.records.slice()
			: this.checkedRecords = [];
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

		this.afterSetSort.emit();
	}
}
