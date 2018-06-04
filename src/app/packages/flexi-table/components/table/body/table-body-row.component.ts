import { Component, ChangeDetectionStrategy, OnInit, Input, ChangeDetectorRef } from '@angular/core';

import { TableDataService } from '../../../data/data.service';

@Component({
	selector: 'ngx-table-body-row',
	host: { 'class': 'table-body-row-container' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div
			*ngIf="(tableData.init$ | async) as init"
			bodyRowStyle
			class="body-row"
			[class.body-row-border-top-add]="addBorder"
			[class.body-row-border-bottom-remove]="removeBorder"
		>
			<ngx-table-body-cell
				*ngIf="init.rowDetail"
				class="row-detail-table-body-cell"
				stopPropagationClick
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
			<ngx-table-body-cell
				*ngIf="init.newTab.show"
				[dataType]="'newTab'"
				[value]="record"
			></ngx-table-body-cell>
			<ngx-table-body-cell
				*ngIf="init.checkboxes"
				[dataType]="'checkbox'"
				[value]="record"
			></ngx-table-body-cell>
		</div>
		<div stopPropagationClick class="body-row-details">
			<ngx-table-body-row-details *ngIf="showRowDetails" [record]="record"></ngx-table-body-row-details>
		</div>
	`
})
export class TableBodyRowComponent implements OnInit {
	@Input() record: {};
	@Input() addBorder: boolean;
	@Input() removeBorder: boolean;

	showRowDetails: boolean;

	constructor(
		public tableData: TableDataService,
		private _cdr: ChangeDetectorRef
	) {}

	ngOnInit(): void {
		this.showRowDetails = false;
	}
}
