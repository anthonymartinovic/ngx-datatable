import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef, ErrorHandler } from '@angular/core';
import { Subscription } from 'rxjs';

import { ArrayService } from '../../../services/array.service';
import { ObjectService } from '../../../services/object.service';
import { TableDataService } from '../../../data/data.service';

@Component({
	selector: 'ngx-table-body',
	host: { 'class': 'table-body' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<ng-container *ngIf="pagedRecords && groupOptions else noGroupOptions">

			<ng-container *ngFor="let groupValue of groupValues; trackBy: arrayService.trackByFn">
				<ngx-table-body-group 
					[selectedGroup]="selectedGroup"
					[value]="groupValue"
					[hiddenGroupValues]="hiddenGroupValues"
					(toggleChange)="toggleGroupVisibility(groupValue)"
				></ngx-table-body-group>
				<ng-container *ngIf="!hiddenGroupValues.includes(groupValue)">
					<ng-container *ngFor="let record of pagedRecords | groupBy: selectedGroup : groupValue; trackBy: arrayService.trackByFn">
						<ngx-table-body-row
							bodyRowStyle
							[record]="record"
							(click)="selectRow(record)"
						></ngx-table-body-row>
					</ng-container>
				</ng-container>
			</ng-container>

		</ng-container>

		<ng-template #noGroupOptions>
			<ng-container *ngIf="pagedRecords">
				<ngx-table-body-row
					*ngFor="let record of pagedRecords; let i = index; trackBy: arrayService.trackByFn"
					bodyRowStyle
					[record]="record"
					[addBorder]="i === 0"
					[removeBorder]="i === (pagedRecords.length - 1)"
					(click)="selectRow(record)"
				></ngx-table-body-row>
			</ng-container>
		</ng-template>
	`
})
export class TableBodyComponent implements OnInit, OnDestroy {
	initSub: Subscription;
	pagedRecordsSub: Subscription;

	hiddenGroupValues: any[];
	selectedGroup: string;
	groupOptions: string[];
	pagedRecords: {}[];
	selectableState: boolean;

	constructor(
		public arrayService: ArrayService,
		public tableData: TableDataService, 
		private errorHandler: ErrorHandler,
		private cdr: ChangeDetectorRef,
		private objectService: ObjectService
	) {}

	ngOnInit(): void {
		this.hiddenGroupValues = [];

		this.initSub = this.tableData.init$.subscribe(init => {
			if (init)
			{
				this.groupOptions = init.groupBy;
				this.selectableState = init.selectable;
				this.cdr.markForCheck();
			}
		});
		this.pagedRecordsSub = this.tableData.pagedRecords$.subscribe(pagedRecords => {
			this.pagedRecords = pagedRecords;
			this.cdr.markForCheck();
		});
	}

	ngOnDestroy(): void {
		this.initSub.unsubscribe();
		this.pagedRecordsSub.unsubscribe();
	}

	selectRow = (row: {}): void => (this.selectableState) ? this.tableData.publishRowSelection(row) : null;

	toggleGroupVisibility(groupValue: any): void {
		(this.hiddenGroupValues.indexOf(groupValue) != -1)
			? this.hiddenGroupValues = this.hiddenGroupValues.filter(hgv => hgv != groupValue)
			: this.hiddenGroupValues.push(groupValue);

		this.cdr.markForCheck();
	}

	get groupValues(): any[] {
		if (this.pagedRecords)
		{
			this.selectedGroup = this.groupOptions.find(group =>
			{
				for (let record of this.pagedRecords)
					if (record.hasOwnProperty(group) || this.objectService.hasOwnNestedProperty(record, group)) return true;

				return false;
			});

		} else return [];

		let groupValues = [];

		for (let record of this.pagedRecords)
			if (record.hasOwnProperty(this.selectedGroup) || this.objectService.hasOwnNestedProperty(record, this.selectedGroup))
				if (groupValues.indexOf(this.objectService.getNestedProperty(record, this.selectedGroup)) === -1)
					groupValues.push(this.objectService.getNestedProperty(record, this.selectedGroup));

		return groupValues;
	}
}
