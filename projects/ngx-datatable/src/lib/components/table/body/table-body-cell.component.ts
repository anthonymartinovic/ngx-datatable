import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { TableDataService } from '../../../data';
import { DT_ColumnMap } from '../../../models';
import { ArrayService, ImgService, ObjectService } from '../../../services';

@Component({
	selector: 'ngx-table-body-cell',
	host: { 'class': 'table-body-cell' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<ng-container *ngIf="dataType === 'standard'">
			<div class="body-cell text" [cellStyle]="column.access(value)">
				{{ column.access(value) | formatCell: column.format }}
			</div>
		</ng-container>
		<ng-container *ngIf="dataType === 'newTab'">
			<div
				class="body-cell svg"
				stopPropagationEvent
				[cellStyle]="'newTab'"
				[innerHTML]="imgService.getSVG('newTab')"
				(click)="emitNewTabValue(value)"
			></div>
		</ng-container>
		<ng-container *ngIf="dataType === 'checkbox'">
			<div 
				class="body-cell checkbox-container"
				[cellStyle]="'checkbox'"
			>
				<input 
					type="checkbox"
					class="checkbox"
					stopPropagationEvent
					[checked]="isChecked(value)" 
					(change)="update(value)"
				/>
			</div>
		</ng-container>
		<ng-container *ngIf="dataType === 'rowDetail'">
			<div 
				class="body-cell svg" 
				[cellStyle]="'rowDetail'"
				[innerHTML]="(showRowDetails) ? imgService.getSVG('arrowOpen') : imgService.getSVG('arrowClosed')"
				(click)="showRowDetailsChange.emit(!showRowDetails)"
			></div>
		</ng-container>
	`
})
export class TableBodyCellComponent implements OnInit, OnDestroy {
	initSub: Subscription;
	recordsSub: Subscription;
	checkedRecordsSub: Subscription;

	serverSide: boolean;
	records: {}[];
	checkedRecords: {}[];
	newTabKeys: string[];

	@Input() dataType: string;
	@Input() value: {};
	@Input() column: DT_ColumnMap;
	@Input() showRowDetails: boolean;
	@Output() showRowDetailsChange: EventEmitter<boolean> = new EventEmitter();

	constructor(
		private cdr: ChangeDetectorRef,
		private arrayService: ArrayService,
		private objectService: ObjectService,
		public imgService: ImgService,
		public tableData: TableDataService
	) {}

	ngOnInit(): void {
		this.initSub = this.tableData.init$.subscribe(init => {
			this.serverSide = init.server;
			this.newTabKeys = init.newTab.keys
		});
		this.recordsSub = this.tableData.records$.subscribe(records => {
			this.records = records;
			this.cdr.markForCheck();
		});
		this.checkedRecordsSub = this.tableData.checkedRecords$.subscribe(checkedRecords => { 
			this.checkedRecords = checkedRecords;
			this.cdr.markForCheck();
		});
	}

	ngOnDestroy(): void {
		this.initSub.unsubscribe();
		this.recordsSub.unsubscribe();
		this.checkedRecordsSub.unsubscribe();
	}

	isChecked(record): boolean {
		return (this.serverSide)
			? this.arrayService.arrayIncludes(record, this.checkedRecords)
			: (this.checkedRecords.indexOf(record) > -1);
	}

	update(record): void {
		let checkedRecords = [...this.checkedRecords];

		if (this.serverSide)
		{
			if (this.arrayService.arrayIncludes(record, checkedRecords))
			{
				const recordToRemove = checkedRecords.find(checkedRecord => JSON.stringify(checkedRecord) === JSON.stringify(record));
				checkedRecords.splice(checkedRecords.indexOf(recordToRemove), 1);
			}
			else checkedRecords.push(record);
		}
		else
		{
			let index = checkedRecords.indexOf(record);
		
			(index > -1)
				? checkedRecords.splice(index, 1)
				: checkedRecords.push(record);
		}

		this.tableData.publishCheckedRecords(checkedRecords);
		this.tableData.runIsAllChecked();
	}

	emitNewTabValue(record: {}) {
		for (let key of this.newTabKeys)
			if (this.objectService.hasOwnNestedProperty(record, key))
				return this.tableData.publishNewTabSelection(this.objectService.getNestedProperty(record, key));
	}
}
