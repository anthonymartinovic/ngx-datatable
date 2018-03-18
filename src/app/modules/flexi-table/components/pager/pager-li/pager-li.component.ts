import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-pager-li',
	template: `
		<li [flexiPagerStyle]="styleParams">
			<a (click)="setPage(button.value)">
				{{ button.symbol }}
			</a>
		</li>
  `,
	styles: [],
})
export class PagerLiComponent {
	@Input() button: {
		name: string,
		symbol: string,
		value: number
	};
	@Input() page: number;
	@Input() currentPage: number;
	@Input() totalPages: number;

	@Output() onSetPage = new EventEmitter<any>();

	styleParams: {};

	constructor() {
		this.styleParams = {
			button: this.button.name,
			page: this.page,
			currentPage: this.currentPage,
			totalPages: this.totalPages
		}
	}

	setPage(page: number) {
		this.onSetPage.emit(page);
	}
}
