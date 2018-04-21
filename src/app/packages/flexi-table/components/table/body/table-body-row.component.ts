import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { TableDataService } from '../../../data/table.data.service';

@Component({
	selector: 'ngx-table-body-row',
	host: { 'class': 'table-body-row' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<ngx-table-body-cell [dataType]="'rowDetail'" [value]="record"></ngx-table-body-cell>
		<ng-container *ngFor="let column of tableData.columns$ | async">
			<ngx-table-body-cell
				[dataType]="'standard'"
				[column]="column"
				[value]="record"
			></ngx-table-body-cell>
		</ng-container>
		<ngx-table-body-cell [dataType]="'newTab'" [value]="record"></ngx-table-body-cell>
		<ngx-table-body-cell [dataType]="'checkbox'" [value]="record"></ngx-table-body-cell>
	`
})
export class TableBodyRowComponent {
	@Input() record: {};

	constructor(public tableData: TableDataService) {}
}
