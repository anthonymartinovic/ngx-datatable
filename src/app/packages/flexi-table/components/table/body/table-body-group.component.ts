import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ColumnMap } from '../../../models/column.model';

import { ImgService } from '../../../services/img.service';
import { SortService } from '../../../services/sort.service';
import { TableDataService } from '../../../data/table.data.service';

@Component({
	selector: 'ngx-table-body-group',
	host: { 'class': 'table-body-group' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="table-body-group-row">
			<span class="group-row-name" (click)="setSort(selectedGroup)">{{selectedGroup}}:</span>
			<span class="group-row-value">{{value}}</span>
			<ng-container *ngIf="groupOpen else groupClosed">
				<div 
					class="group-row-toggle" 
					[innerHTML]="imgService.getSVG('close')"
					(click)="groupOpen = !groupOpen"
				></div>
			</ng-container>
			<ng-template #groupClosed>
				<div 
					class="group-row-toggle" 
					[innerHTML]="imgService.getSVG('open')"
					(click)="groupOpen = !groupOpen"
				></div>
			</ng-template>
		</div>
	`
})
export class TableBodyGroupComponent implements OnInit {
	recordsSub: Subscription;
	sortedColumnSub: Subscription;

	@Input() selectedGroup: any;
	@Input() value: any;

	groupOpen: boolean;
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
		this.recordsSub      = this.tableData.records$.subscribe(records => this.records = records);
		this.sortedColumnSub = this.tableData.sortedColumn$.subscribe(sortedColumn => this.sortedColumn = sortedColumn);

		this.groupOpen = true;
	}

	ngOnDestroy(): void {
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

		this.records = this._sortService.sortRecords(this.records, this.sortedColumn);

		this.tableData.publishRecords(this.records);
		this.tableData.publishSortedColumn(this.sortedColumn);
		this.tableData.runInitSetPage();
	}
}
