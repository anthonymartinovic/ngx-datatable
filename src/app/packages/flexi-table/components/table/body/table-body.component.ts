import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { TableDataService } from '../../../data/table.data.service';

@Component({
	selector: 'ngx-table-body',
	host: { 'class': 'table-body' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<ng-container *ngIf="groupOptions else noGroupOptions">
			<ng-container *ngFor="let groupValue of groupValues">
				<ngx-table-body-group 
					[selectedGroup]="selectedGroup"
					[value]="groupValue"
					(click)="toggleGroupVisibility(groupValue)"
				></ngx-table-body-group>
				<ng-container *ngIf="!hiddenGroupValues.includes(groupValue)">
					<ngx-table-body-row 
						*ngFor="let record of pagedRecords | groupBy: selectedGroup : groupValue"
						bodyRowStyle
						[record]="record"
						(click)="selectRow(record)"
					></ngx-table-body-row>
				</ng-container>
			</ng-container>
		</ng-container>
		<ng-template #noGroupOptions>
			<ngx-table-body-row
				*ngFor="let record of pagedRecords"
				bodyRowStyle
				[record]="record"
				(click)="selectRow(record)"
			></ngx-table-body-row>
		</ng-template>
	`
})
export class TableBodyComponent implements OnInit, OnDestroy {
	groupOptionsSub: Subscription;
	pagedRecordsSub: Subscription;

	hiddenGroupValues: any[];
	selectedGroup: string;
	groupOptions: string[];
	pagedRecords: {}[];

	constructor(
		public tableData: TableDataService, 
		private _cdr: ChangeDetectorRef
	) {}

	ngOnInit(): void {
		this.hiddenGroupValues = [];

		this.groupOptionsSub = this.tableData.groupBy$.subscribe(groupOptions => {
			this.groupOptions = groupOptions;
			this._cdr.markForCheck();
		});
		this.pagedRecordsSub = this.tableData.pagedRecords$.subscribe(pagedRecords => {
			this.pagedRecords = pagedRecords;
			this._cdr.markForCheck();
		});
	}

	ngOnDestroy(): void {
		this.groupOptionsSub.unsubscribe();
		this.pagedRecordsSub.unsubscribe();
	}

	selectRow(row: {}): void {
		this.tableData.publishRowSelection(row);
	}

	toggleGroupVisibility(groupValue: any): void {
		(this.hiddenGroupValues.indexOf(groupValue) != -1)
			? this.hiddenGroupValues = this.hiddenGroupValues.filter(hgv => hgv != groupValue)
			: this.hiddenGroupValues.push(groupValue);

		this._cdr.markForCheck();
	}

	get groupValues(): any[] {
		if (this.pagedRecords)
		{
			this.selectedGroup = this.groupOptions.find(group =>
			{
				for (let record of this.pagedRecords)
					if (record.hasOwnProperty(group)) return true;

				return false;
			});

		} else return [];

		let groupValues = [];

		for (let record of this.pagedRecords)
			if (record.hasOwnProperty(this.selectedGroup))
				if (groupValues.indexOf(record[this.selectedGroup]) === -1) groupValues.push(record[this.selectedGroup]);

		return groupValues;
	}
}
