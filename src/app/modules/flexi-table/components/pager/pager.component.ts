import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { PagerModel } from '../../models/pager.model';
import { PagerService } from '../../services/pager.service';

@Component({
	selector: 'app-pager',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<ul *ngIf="pager && pager.selectablePages && pager.selectablePages.length > 1" class="pagination">
			<li [flexiPagerStyle]="{ button: 'first', currentPage: pager.currentPage }">
				<a (click)="setPage(1)">|<</a>
			</li>
			<li [flexiPagerStyle]="{ button: 'previous', currentPage: pager.currentPage }">
				<a (click)="setPage(pager.currentPage - 1)"><</a>
			</li>
			<li 
				*ngFor="let page of pager.selectablePages"
				[flexiPagerStyle]="{ button: 'number', page: page, currentPage: pager.currentPage }"
			>
				<a (click)="setPage(page)">{{ page }}</a>
			</li>
			<li [flexiPagerStyle]="{ button: 'next', currentPage: pager.currentPage, totalPages: pager.totalPages }">
				<a (click)="setPage(pager.currentPage + 1)">></a>
			</li>
			<li [flexiPagerStyle]="{ button: 'last', currentPage: pager.currentPage, totalPages: pager.totalPages }">
				<a (click)="setPage(pager.totalPages)">>|</a>
			</li>
		</ul>
	`
})
export class PagerComponent {
	@Input() records: any[];
	@Input() recordsPerPage: number;

	@Output() pagedRecordsChange = new EventEmitter<any[]>();

	pager: PagerModel;
	pagedRecords: any[];

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
