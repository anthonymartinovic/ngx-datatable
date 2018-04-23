import { Component, ChangeDetectionStrategy, OnInit, Input, ChangeDetectorRef } from '@angular/core';

import { TableDataService } from '../../../data/table.data.service';

@Component({
	selector: 'ngx-table-body-row',
	host: { 'class': 'table-body-row' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="body-row" bodyRowStyle>
			<ngx-table-body-cell 
				[dataType]="'rowDetail'" 
				[value]="record"
				[showRowDetails]="showRowDetails"
				(showRowDetailsChange)="showRowDetails = $event"
			></ngx-table-body-cell>
			<ng-container *ngFor="let column of tableData.columns$ | async">
				<ngx-table-body-cell
					[dataType]="'standard'"
					[column]="column"
					[value]="record"
				></ngx-table-body-cell>
			</ng-container>
			<ngx-table-body-cell [dataType]="'newTab'" [value]="record"></ngx-table-body-cell>
			<ngx-table-body-cell [dataType]="'checkbox'" [value]="record"></ngx-table-body-cell>
		</div>
		<div class="body-row-details">
			<ngx-table-body-row-details *ngIf="showRowDetails" [record]="record"></ngx-table-body-row-details>
		</div>
	`
})
export class TableBodyRowComponent implements OnInit {
	@Input() record: {};

	showRowDetails: boolean;

	constructor(
		public tableData: TableDataService,
		private _cdr: ChangeDetectorRef
	) {}

	ngOnInit(): void {
		this.showRowDetails = false;
	}
}
