import { Component, ChangeDetectionStrategy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { PageData } from '../../models/server-init.model';
import { PagerModel } from '../../models/pager.model';
import { TableInit } from '../../models/table-init.model';

import { PagerService } from '../../services/pager.service';
import { RecordsFormatterService } from '../../services/records-formatter.service';

@Component({
	selector: 'ngx-pager',
	host: { 'class': 'table-pager' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="total-records">Total: {{this.records.length}}</div>
		<ul *ngIf="pager && pager.selectablePages && pager.selectablePages.length > 1" class="pager-ul">
			<ngx-pager-li
				[button]="{ name: 'first', symbol: '|<', value: 1 }"
				[currentPage]="pager.currentPage"
				(onSetPage)="setPagePrep($event)"
			></ngx-pager-li>
			<ngx-pager-li
				[button]="{ name: 'previous', symbol: '<', value: pager.currentPage - 1 }"
				[currentPage]="pager.currentPage"
				(onSetPage)="setPagePrep($event)"
			></ngx-pager-li>
			<ng-container *ngFor="let page of pager.selectablePages">
				<ngx-pager-li
					[button]="{ name: 'number', symbol: page, value: page }"
					[page]="page"
					[currentPage]="pager.currentPage"
					(onSetPage)="setPagePrep($event)"
				></ngx-pager-li>
			</ng-container>
			<ngx-pager-li
				[button]="{ name: 'next', symbol: '>', value: pager.currentPage + 1 }"
				[currentPage]="pager.currentPage"
				[totalPages]="pager.totalPages"
				(onSetPage)="setPagePrep($event)"
			></ngx-pager-li>
			<ngx-pager-li
				[button]="{ name: 'last', symbol: '>|', value: pager.totalPages }"
				[currentPage]="pager.currentPage"
				[totalPages]="pager.totalPages"
				(onSetPage)="setPagePrep($event)"
			></ngx-pager-li>
		</ul>
	`
})
export class PagerComponent implements OnInit {
	@Input() init: TableInit;
	@Input() records: {}[];
	@Input() pageLimit: number;
	@Input() pageData: PageData;

	@Output() pagedRecordsChange: EventEmitter<{}[]> = new EventEmitter();
	@Output() serverPageChange: EventEmitter<number> = new EventEmitter();

	pager: PagerModel;
	pagedRecords: {}[];

	constructor(private _pagerService: PagerService) {}

	ngOnInit(): void {}

	setPagePrep = (page: number): void => (this.init.serverSide) ? this.setPage(page, false, true) : this.setPage(page);

	setPage(page: number, bypassGuard: boolean = false, serverPageChange: boolean = false): void {
		if (serverPageChange) return this.serverPageChange.emit(page);

		if (!bypassGuard && (page < 1 || page > this.pager.totalPages || page === this.pager.currentPage)) return;

		this.pager = (this.init.serverSide)
			? this._pagerService.getPager(this.pageData.total, this.pageData.currentPage, this.pageData.limit)
			: this._pagerService.getPager(this.records.length, page, this.pageLimit || 10);
	 
		this.pagedRecords = (this.init.serverSide)
			? this.records
			: this.records.slice(this.pager.startIndex, this.pager.endIndex + 1);

		this.pagedRecordsChange.emit(this.pagedRecords);
	}
}
