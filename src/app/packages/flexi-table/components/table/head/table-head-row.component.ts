import { Component, ChangeDetectionStrategy } from '@angular/core';

import { TableDataService } from '../../../data/table.data.service';

@Component({
	selector: 'ngx-table-head-row',
	host: { 'class': 'table-head-row-container' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="head-row" headRowStyle>
			<ngx-table-head-cell [headerType]="'rowDetail'"></ngx-table-head-cell>
			<ng-container *ngFor="let column of tableData.columns$ | async">
				<ngx-table-head-cell
					[headerType]="'standard'"
					[column]="column"
					[value]="column.header"
				></ngx-table-head-cell>
			</ng-container>
			<ngx-table-head-cell
				[headerType]="'newTab'"
				[value]="tableData.newTabCaption$ | async"
			></ngx-table-head-cell>
			<ngx-table-head-cell
				[headerType]="'checkbox'"
			></ngx-table-head-cell>
		</div>
	`
})
export class TableHeadRowComponent {

	constructor(public tableData: TableDataService) {}
}
