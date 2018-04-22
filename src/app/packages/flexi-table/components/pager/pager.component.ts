import { Component, ChangeDetectionStrategy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { PagerModel } from '../../models/pager.model';

import { PagerService } from '../../services/pager.service';
import { RecordsFormatterService } from '../../services/records-formatter.service';

@Component({
	selector: 'ngx-pager',
	host: { 'class': 'pager' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="total-records">Total: {{this.records.length}}</div>
		<ul *ngIf="pager && pager.selectablePages && pager.selectablePages.length > 1" class="pager-ul">
			<ngx-pager-li
				[button]="{ name: 'first', symbol: '|<', value: 1 }"
				[currentPage]="pager.currentPage"
				(onSetPage)="setPage($event)"
			></ngx-pager-li>
			<ngx-pager-li
				[button]="{ name: 'previous', symbol: '<', value: pager.currentPage - 1 }"
				[currentPage]="pager.currentPage"
				(onSetPage)="setPage($event)"
			></ngx-pager-li>
			<ng-container *ngFor="let page of pager.selectablePages">
				<ngx-pager-li
					[button]="{ name: 'number', symbol: page, value: page }"
					[page]="page"
					[currentPage]="pager.currentPage"
					(onSetPage)="setPage($event)"
				></ngx-pager-li>
			</ng-container>
			<ngx-pager-li
				[button]="{ name: 'next', symbol: '>', value: pager.currentPage + 1 }"
				[currentPage]="pager.currentPage"
				[totalPages]="pager.totalPages"
				(onSetPage)="setPage($event)"
			></ngx-pager-li>
			<ngx-pager-li
				[button]="{ name: 'last', symbol: '>|', value: pager.totalPages }"
				[currentPage]="pager.currentPage"
				[totalPages]="pager.totalPages"
				(onSetPage)="setPage($event)"
			></ngx-pager-li>
		</ul>
	`
})
export class PagerComponent implements OnInit {
	@Input() records: {}[];
	@Input() recordsPerPage: number;

	@Output() pagedRecordsChange: EventEmitter<{}[]> = new EventEmitter();

	pager: PagerModel;
	pagedRecords: {}[];

	constructor(private _pagerService: PagerService) {}

	ngOnInit(): void {}

	setPage(page: number, bypassGuard: boolean = false): void {
		if (!bypassGuard &&
			(page < 1 || page > this.pager.totalPages || page === this.pager.currentPage))
			return;

		this.pager = this._pagerService.getPager(this.records.length, page, this.recordsPerPage || 10);
 
		this.pagedRecords = this.records.slice(this.pager.startIndex, this.pager.endIndex + 1);

		this.pagedRecordsChange.emit(this.pagedRecords);
	}
}
