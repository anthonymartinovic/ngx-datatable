import { Component, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'app-pager-li',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<li [flexiPagerStyle]="styleParams">
			<a (click)="initSetPage(button.value)">
				{{ button.symbol }}
			</a>
		</li>
	`
})
export class PagerLiComponent implements OnChanges {
	@Input() button: {
		name: string,
		symbol: string | number,
		value: number
	};
	@Input() page: number;
	@Input() currentPage: number;
	@Input() totalPages: number;

	@Output() onSetPage = new EventEmitter<any>();

	styleParams: {} = {};

	constructor() {}

	ngOnChanges() {
		this.styleParams = {
			button: this.button.name,
			page: this.page,
			currentPage: this.currentPage,
			totalPages: this.totalPages
		}
	}

	initSetPage(page: number) {
		this.onSetPage.emit(page);
	}
}
