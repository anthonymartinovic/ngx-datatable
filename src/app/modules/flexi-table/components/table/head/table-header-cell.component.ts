import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TableDataService } from '../table.data.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'ngx-table-header-cell',
	host: { class: 'table-header-cell' },
	template: `
		<ng-container *ngIf="headerType === 'standard' || headerType === 'newTab'">
			<div class="header-cell-text">{{value}}</div>
		</ng-container>
		<ng-container *ngIf="headerType === 'checkbox'">
			<div class="header-cell-checkbox-container" [flexiCellStyle]="'checkbox'">
				<input
					type="checkbox"
					class="header-cell-checkbox"
					[checked]="isAllChecked()" 
					(change)="updateAll()"
				>
			</div>
		</ng-container>
	`
})
export class TableHeaderCellComponent implements OnInit, OnDestroy {
	recordsSub: Subscription;
	checkedRecordsSub: Subscription;
	isAllCheckedSub: Subscription;

	@Input() headerType: string;
	@Input() value: any;

	records: {}[];
	checkedRecords: {}[];
	wasAllChecked: boolean = false;

	constructor(
		private _cdr: ChangeDetectorRef,
		private _tableData: TableDataService
	) {}

	ngOnInit(): void {
		this.recordsSub        = this._tableData.records$.subscribe(records => this.records = records);
		this.checkedRecordsSub = this._tableData.checkedRecords$.subscribe(checkedRecords => this.checkedRecords = checkedRecords);
		this.isAllCheckedSub   = this._tableData.isAllCheckedSubject$.subscribe(() => this.isAllChecked());
	}

	ngOnDestroy(): void {
		this.recordsSub.unsubscribe();
		this.checkedRecordsSub.unsubscribe();
		this.isAllCheckedSub.unsubscribe();
	}

	isAllChecked(): boolean {
		if ((this.records && this.checkedRecords) && (this.checkedRecords.length === this.records.length)) {
			if (!this.wasAllChecked) (this.wasAllChecked = true, this._cdr.markForCheck());
			return true;
		} else {
			if (this.wasAllChecked) (this.wasAllChecked = false, this._cdr.markForCheck());
			return false;
		}
	}

	updateAll(): void {
		(!this.checkedRecords || this.checkedRecords.length != this.records.length)
			? this.checkedRecords = this.records.slice()
			: this.checkedRecords = [];
		
		this._tableData.publishCheckedRecords(this.checkedRecords);
	}
}
