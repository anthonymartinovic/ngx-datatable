import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectorRef, ErrorHandler } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ColumnMap } from '../../../models/column.model';

import { ArrayComparatorService } from '../../../services/array-comparator.service';
import { ImgService } from '../../../services/img.service';
import { TableDataService } from '../../../data/table.data.service';

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
				stopPropagationClick
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
					stopPropagationClick
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
	serverSideStateSub: Subscription;
	recordsSub: Subscription;
	checkedRecordsSub: Subscription;
	newTabKeysSub: Subscription;

	serverSideState: boolean;
	records: {}[];
	checkedRecords: {}[];
	newTabKeys: string[];

	@Input() dataType: string;
	@Input() value: {};
	@Input() column: ColumnMap;
	@Input() showRowDetails: boolean;
	@Output() showRowDetailsChange: EventEmitter<boolean> = new EventEmitter();

	constructor(
		private _cdr: ChangeDetectorRef,
		private _errorHandler: ErrorHandler,
		private _arrayComparator: ArrayComparatorService,
		public imgService: ImgService,
		public tableData: TableDataService
	) {}

	ngOnInit(): void {
		this.serverSideStateSub = this.tableData.serverSideState$.subscribe(sss => this.serverSideState = sss);
		this.newTabKeysSub = this.tableData.newTabKeys$.subscribe(newTabKeys => this.newTabKeys = newTabKeys);
		this.recordsSub = this.tableData.records$.subscribe(records => {
			this.records = records;
			this._cdr.markForCheck();
		});
		this.checkedRecordsSub = this.tableData.checkedRecords$.subscribe(checkedRecords => { 
			this.checkedRecords = checkedRecords;
			this._cdr.markForCheck();
		});
	}

	ngOnDestroy(): void {
		this.serverSideStateSub.unsubscribe();
		this.recordsSub.unsubscribe();
		this.checkedRecordsSub.unsubscribe();
		this.newTabKeysSub.unsubscribe();
	}

	isChecked(record): boolean {
		return (this.serverSideState)
			? this._arrayComparator.arrayIncludes(record, this.checkedRecords)
			: (this.checkedRecords.indexOf(record) > -1);
	}

	update(record): void {
		let checkedRecords = [...this.checkedRecords];

		if (this.serverSideState)
		{
			if (this._arrayComparator.arrayIncludes(record, checkedRecords))
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
		for (let key of this.newTabKeys) {
			if (record.hasOwnProperty(key)) return this.tableData.publishNewTabSelection(record[key]);
		}

		return this._errorHandler.handleError(
			`No 'newTabKeys' provided match any keys within selected row.\n
			Keys within selected row are: [${Object.keys(record)}]`
		);
	}
}
