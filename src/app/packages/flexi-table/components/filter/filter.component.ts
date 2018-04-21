import { Component, ChangeDetectionStrategy, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { ColumnMap } from '../../models/column.model';

import { ImgService } from '../../services/img.service';
import { FilterService } from '../../services/filter.service';

@Component({
	selector: 'ngx-filter',
	host: { class: 'filter' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="search-container">
			<div class="search-icon" [innerHTML]="imgService.getSVG('search')"></div>
			<select
				*ngIf="!globalFilter" 
				[(ngModel)]="selectedFilterColumn" 
				(change)="setFilter()"
			>
				<option *ngFor="let column of columns" [ngValue]="column.primeKey">{{column.header}}</option>
			</select>
			<input
				type="text"
				class="search-input"
				[placeholder]="placeholderText"
				(keyup)="setFilter($event.target)"
			/>
		</div>
	`,
})
export class FilterComponent implements OnChanges {
	@Input() columns: ColumnMap[];
	@Input() records: {}[];
	@Input() globalFilter: string;

	@Output() recordsChange: EventEmitter<{}[]> = new EventEmitter();

	cachedTarget: HTMLInputElement;
	selectedFilterColumn: string;

	constructor(
		public imgService: ImgService,
		private _filterService: FilterService,
	) {}

	ngOnChanges(): void {
		if (!this.globalFilter) this.selectedFilterColumn = this.columns[0].primeKey;
	}

	setFilter(target?: HTMLInputElement): void {
		if (target) this.cachedTarget = target;
		if (!this.cachedTarget) return;

		const filteredRecords = this._filterService.filterRecords(
			this.cachedTarget.value.toLowerCase(), 
			(this.globalFilter) ? this.globalFilter : this.selectedFilterColumn, 
			this.columns, 
			this.records
		);

		this.recordsChange.emit(filteredRecords);
	}

	get placeholderText(): string {
		return `Filter ${(this.globalFilter) ? this.globalFilter : 'selected'} column...`;
	}
}
