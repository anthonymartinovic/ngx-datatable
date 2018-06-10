import { Component, ChangeDetectionStrategy, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TableDataService } from '../../data';
import { DT_Init, DT_Pager, DT_ServerPageData } from '../../models';
import { ArrayService, PagerService } from '../../services';

@Component({
	selector: 'ngx-pager',
	host: { 'class': 'table-pager' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div *ngIf="pager" class="total-records">{{recordsTally}}</div>
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
			<ng-container *ngFor="let page of pager.selectablePages; trackBy: arrayService.trackByFn">
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
	@Input() init: DT_Init;
	@Input() records: {}[];
	@Input() pageLimit: number;
	@Input() pageData: DT_ServerPageData;

	@Output() pagedRecordsChange: EventEmitter<{}[]> = new EventEmitter();
	@Output() serverPageChange: EventEmitter<number> = new EventEmitter();

	pager: DT_Pager;
	pagedRecords: {}[];

	constructor(
		public arrayService: ArrayService,
		private pagerService: PagerService,
		private tableData: TableDataService
	) {}

	ngOnInit(): void {}

	setPagePrep = (page: number): void => (this.init.server) ? this.setPage(page, false, true) : this.setPage(page);

	setPage(page: number, bypassGuard: boolean = false, serverPageChange: boolean = false): void {
		if (serverPageChange) return this.serverPageChange.emit(page);

		if (!bypassGuard && (page < 1 || page > this.pager.totalPages || page === this.pager.currentPage)) return;

		this.pager = (this.init.server)
			? this.pagerService.getPager(Number(this.pageData.total), Number(this.pageData.currentPage), Number(this.pageData.limit))
			: this.pagerService.getPager(this.records.length, page, this.pageLimit || 10);
	 
		this.pagedRecords = (this.init.server)
			? this.records
			: this.records.slice(this.pager.startIndex, this.pager.endIndex + 1);

		this.pagedRecordsChange.emit(this.pagedRecords);
	}

	get recordsTally(): string {
		return (this.pager && this.pager.totalRecords > 0)
			? `${this.pager.startIndex + 1} - ${this.pager.endIndex + 1} / ${this.pager.totalRecords}`
			: 'No records';
	}
}
