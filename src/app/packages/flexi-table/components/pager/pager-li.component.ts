import { Component, ChangeDetectionStrategy, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'ngx-pager-li',
	host: { 'class': 'pager-li' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<li class="li-item" [pagerStyle]="styleParams">
			<a class="li-a" (click)="initSetPage(button.value)">
				{{ button.symbol }}
			</a>
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

	constructor() {
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
		this.onSetPage.emit(page);
	}
}
