import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { PagerModel } from '../../models/pager.model';

import { PagerService } from '../../services/pager.service';

@Component({
	selector: 'app-pager',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<ul *ngIf="pager && pager.selectablePages && pager.selectablePages.length > 1">
			<app-pager-li
				[button]="{ name: 'first', symbol: '|<', value: 1 }"
				[currentPage]="pager.currentPage"
				(onSetPage)="setPage($event)"
			></app-pager-li>
			<app-pager-li
				[button]="{ name: 'previous', symbol: '<', value: pager.currentPage - 1 }"
				[currentPage]="pager.currentPage"
				(onSetPage)="setPage($event)"
			></app-pager-li>
			<ng-container *ngFor="let page of pager.selectablePages">
				<app-pager-li
					[button]="{ name: 'number', symbol: page, value: page }"
					[page]="page"
					[currentPage]="pager.currentPage"
					(onSetPage)="setPage($event)"
				></app-pager-li>
			</ng-container>
			<app-pager-li
				[button]="{ name: 'next', symbol: '>', value: pager.currentPage + 1 }"
				[currentPage]="pager.currentPage"
				[totalPages]="pager.totalPages"
				(onSetPage)="setPage($event)"
			></app-pager-li>
			<app-pager-li
				[button]="{ name: 'last', symbol: '>|', value: pager.totalPages }"
				[currentPage]="pager.currentPage"
				[totalPages]="pager.totalPages"
				(onSetPage)="setPage($event)"
			></app-pager-li>
		</ul>
	`
})
export class PagerComponent {
	@Input() records: {}[];
	@Input() recordsPerPage: number;

	@Output() pagedRecordsChange: EventEmitter<{}[]> = new EventEmitter();

	pager: PagerModel;
	pagedRecords: {}[];

	constructor(
		private _pagerService: PagerService
	) {}

	setPage(page: number, bypassGuard: boolean = false): void {
		if (!bypassGuard &&
			(page < 1 || page > this.pager.totalPages || page === this.pager.currentPage))
			return;

		this.pager = this._pagerService.getPager(this.records.length, page, this.recordsPerPage || 10);
 
		this.pagedRecords = this.records.slice(this.pager.startIndex, this.pager.endIndex + 1);

		this.pagedRecordsChange.emit(this.pagedRecords);
	}
}
