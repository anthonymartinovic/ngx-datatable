import { Component, ChangeDetectionStrategy, OnInit, Input, ChangeDetectorRef } from '@angular/core';

import { TableDataService } from '../../../data';
import { ArrayService } from '../../../services';

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
				stopPropagationEvent
				[dataType]="'rowDetail'" 
				[value]="record"
				[showRowDetails]="showRowDetails"
				(showRowDetailsChange)="showRowDetails = $event"
			></ngx-table-body-cell>
			<ng-container *ngFor="let column of tableData.columns$ | async; trackBy: arrayService.trackByFn">
				<ngx-table-body-cell
					[dataType]="'standard'"
					[column]="column"
					[value]="record"
				></ngx-table-body-cell>
			</ng-container>
			<ngx-table-body-cell
				*ngIf="init.newTab.show"
				class="new-tab-table-body-cell"
				[dataType]="'newTab'"
				[value]="record"
			></ngx-table-body-cell>
			<ngx-table-body-cell
				*ngIf="init.checkboxes"
				class="checkboxes-table-body-cell"
				[dataType]="'checkbox'"
				[value]="record"
			></ngx-table-body-cell>
		</div>
		<div stopPropagationEvent class="body-row-details" [class.row-details-open]="showRowDetails">
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
		public arrayService: ArrayService,
		public tableData: TableDataService
	) {}

	ngOnInit(): void {
		this.showRowDetails = false;
	}
}
