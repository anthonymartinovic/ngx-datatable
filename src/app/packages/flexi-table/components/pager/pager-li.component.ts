import { Component, ChangeDetectionStrategy, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { TableDataService } from '../../data/data.service';

@Component({
	selector: 'ngx-pager-li',
	host: { 'class': 'pager-li' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<li
			class="li-item"
			[pagerStyle]="styleParams"
			(click)="initSetPage(button.value)"
		>
			<a class="li-a">{{ button.symbol }}</a>
		</li>
	`
})
export class PagerLiComponent implements OnChanges {
	@Input() button: {
		name: string,
		symbol: number | string,
		value: number
	};
	@Input() page: number;
	@Input() currentPage: number;
	@Input() totalPages: number;

	@Output() onSetPage: EventEmitter<number> = new EventEmitter();

	styleParams: {};

	constructor(private tableData: TableDataService) {
		this.styleParams = {};
	}

	ngOnChanges(): void {
		this.styleParams = {
			button: this.button.name,
			page: this.page,
			currentPage: this.currentPage,
			totalPages: this.totalPages
		}
	}

	initSetPage(page: number): void {
		this.tableData.publishLoading(true);
		this.onSetPage.emit(page);
	}
}
