import { Component, ChangeDetectionStrategy } from '@angular/core';

import { TableDataService } from '../../../data/data.service';
import { ArrayService } from '../../../services/array.service';

@Component({
	selector: 'ngx-table-head-row',
	host: { 'class': 'table-head-row-container' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div
			*ngIf="(tableData.init$ | async) as init"
			class="head-row" 
			headRowStyle
		>
			<ngx-table-head-cell
				*ngIf="init.rowDetail"
				class="row-detail-table-head-cell"
				[headerType]="'rowDetail'"
			></ngx-table-head-cell>
			<ng-container *ngFor="let column of tableData.columns$ | async; trackBy: arrayService.trackByFn">
				<ngx-table-head-cell
					[headerType]="'standard'"
					[column]="column"
					[value]="column.header"
				></ngx-table-head-cell>
			</ng-container>
			<ngx-table-head-cell
				*ngIf="init.newTab.show"
				[headerType]="'newTab'"
				[value]="init.newTab.caption"
			></ngx-table-head-cell>
			<ngx-table-head-cell
				*ngIf="init.checkboxes"
				[headerType]="'checkbox'"
			></ngx-table-head-cell>
		</div>
	`
})
export class TableHeadRowComponent {

	constructor(
		public arrayService: ArrayService,
		public tableData: TableDataService
	) {}
}
