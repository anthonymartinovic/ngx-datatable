import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { ColumnMap } from '../../../models/column.model';

import { ImgService } from '../../../services/img.service';
import { SortService } from '../../../services/sort.service';
import { TableDataService } from '../../../data/table.data.service';

@Component({
	selector: 'ngx-table-body-group',
	host: { 'class': 'table-body-group-container' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="body-group">
			<div class="group-info">
				<div class="group-name" (click)="setSort(selectedGroup)">{{selectedGroup}}:</div>
				<div class="group-value">{{value}}</div>
			</div>
			<div class="group-toggle-options">
				<ng-container *ngIf="hiddenGroupValues.includes(value) else groupOpen">
					<div
						class="group-toggle group-toggle-open" 
						[innerHTML]="imgService.getSVG('open')"
						(click)="toggleChange.emit(this.value)"
					></div>
				</ng-container>
				<ng-template #groupOpen>
					<div 
						class="group-toggle group-toggle-close" 
						[innerHTML]="imgService.getSVG('close')"
						(click)="toggleChange.emit(this.value)"
					></div>
				</ng-template>
			</div>
		</div>
	`
})
export class TableBodyGroupComponent implements OnInit {
	serverSideStateSub: Subscription;
	recordsSub: Subscription;
	sortedColumnSub: Subscription;

	@Input() hiddenGroupValues: any[]
	@Input() selectedGroup: any;
	@Input() value: any;
	@Output() toggleChange: EventEmitter<boolean> = new EventEmitter();

	serverSideState: boolean;
	records: {}[];
	sortedColumn: {
		name: any,
		order: string
	}

	constructor(
		public imgService: ImgService,
		public tableData: TableDataService,
		private _sortService: SortService
	) {}

	ngOnChanges(): void {
		this.tableData.runIsAllChecked();
	}

	ngOnInit(): void {
		this.serverSideStateSub = this.tableData.serverSideState$.subscribe(sss => this.serverSideState = sss);
		this.recordsSub         = this.tableData.records$.subscribe(records => this.records = records);
		this.sortedColumnSub    = this.tableData.sortedColumn$.subscribe(sortedColumn => this.sortedColumn = sortedColumn);
	}

	ngOnDestroy(): void {
		this.serverSideStateSub.unsubscribe();
		this.recordsSub.unsubscribe();
		this.sortedColumnSub.unsubscribe();
	}

	setSort(column: any): void {
		column = new ColumnMap({ primeKey: column });

		if (this.sortedColumn && this.sortedColumn.name === column.access(this.records[0]))
		{
			(this.sortedColumn.order === 'asc')
				? this.sortedColumn.order = 'desc'
				: this.sortedColumn.order = 'asc';
		}
		else
		{
			this.sortedColumn = {
				name: column.access(this.records[0]),
				order: 'asc'
			}
		}

		if (!this.serverSideState)
		{
			this.records = this._sortService.sortRecords(this.records, this.sortedColumn);

			this.tableData.publishRecords(this.records);
			this.tableData.publishSortedColumn(this.sortedColumn);
			this.tableData.runInitSetPage();
		}
		else this.tableData.publishSortedColumn(this.sortedColumn);
	}
}
