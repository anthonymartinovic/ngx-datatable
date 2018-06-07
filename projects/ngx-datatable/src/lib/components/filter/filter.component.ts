import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { ColumnMap } from '../../models/column.model';
import { Init } from '../../models/init.model';

import { ImgService } from '../../services/img.service';
import { FilterService } from '../../services/filter.service';

@Component({
	selector: 'ngx-filter',
	host: { class: 'table-filter' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="filter-container">
			<div class="filter-input-container">
				<div class="filter-input-icon" [innerHTML]="imgService.getSVG('search')"></div>
				<input
					type="text"
					class="filter-input"
					[placeholder]="placeholderText"
					(keyup)="setFilter($event.target)"
				/>
			</div>
		</div>
	`,
})
export class FilterComponent {
	@Input() init: Init;
	@Input() columns: ColumnMap[];
	@Input() records: {}[];
	@Input() globalFilter: string;

	@Output() recordsChange: EventEmitter<{}[]>        = new EventEmitter();
	@Output() serverFilterChange: EventEmitter<string> = new EventEmitter();

	cachedTarget: HTMLInputElement;
	selectedFilterColumn: string;
	timer: any = null;

	constructor(
		public imgService: ImgService,
		private filterService: FilterService
	) {}


	setFilter(target?: HTMLInputElement): void {
		if (this.init.server)
		{
			if (this.timer) clearTimeout(this.timer);
			this.timer = setTimeout(() => this.serverFilterChange.emit(target.value), 1000);
		}
		else
		{
			if (target) this.cachedTarget = target;
			if (!this.cachedTarget) return;
	
			const filteredRecords = this.filterService.filterRecords(
				this.cachedTarget.value.toLowerCase(), 
				(this.globalFilter) ? this.globalFilter : this.selectedFilterColumn, 
				this.columns, 
				this.records
			);
	
			this.recordsChange.emit(filteredRecords);
		}
	}

	get placeholderText(): string { return `Filter ${(this.globalFilter) ? this.globalFilter : 'selected'} column...` }
}
