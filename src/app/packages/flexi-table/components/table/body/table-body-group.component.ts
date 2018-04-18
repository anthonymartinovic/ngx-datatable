import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ColumnMap } from '../../../models/column.model';

import { ImgService } from '../../../services/img.service';
import { SortService } from '../../../services/sort.service';
import { TableDataService } from '../table.data.service';

@Component({
	selector: 'ngx-table-body-group',
	host: { 'class': 'table-body-group' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="table-body-group-row">
			<span class="group-row-name">{{selectedGroup}}: </span>
			<span class="group-row-value">{{value}}</span>
			<div
				class="group-row-toggle"
				[innerHTML]="imgService.getSVG('open')"
				(click)="setSort(selectedGroup)"
			></div>
		</div>
	`
})
export class TableBodyGroupComponent implements OnInit {
	recordsSub: Subscription;
	configSub: Subscription;
	sortedColumnSub: Subscription;

	@Input() selectedGroup: any;
	@Input() value: any;

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
		this.configSub       = this.tableData.config$
		this.sortedColumnSub = this.tableData.sortedColumn$.subscribe(sortedColumn => this.sortedColumn = sortedColumn);
	}

	ngOnDestroy(): void {
		this.recordsSub.unsubscribe();
		this.configSub.unsubscribe();
		this.sortedColumnSub.unsubscribe();
	}

	setSort(column: any): void {
		this.config.map(col => new ColumnMap(col))

		console.log(column);
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
