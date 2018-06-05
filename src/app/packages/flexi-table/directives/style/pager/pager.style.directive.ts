import { Directive, OnChanges, Input, HostBinding } from '@angular/core';

@Directive({
	selector: '[pagerStyle]',
})
export class PagerStyleDirective implements OnChanges {
	@Input() pagerStyle: {
		button: string,
		page?: number,
		currentPage: number,
		totalPages?: number
	};

	@HostBinding('style.color') color: string;
	@HostBinding('style.cursor') cursor: string;
	@HostBinding('style.pointer-events') pointerEvents: string;

	ngOnChanges() {
		if (this.pagerStyle.button === 'first' || 
			this.pagerStyle.button === 'previous')
		{
			(this.pagerStyle.currentPage != 1)
				? this.enable()
				: this.disable();
		}

		if (this.pagerStyle.button === 'last' || 
			this.pagerStyle.button === 'next')
		{
			(this.pagerStyle.currentPage != this.pagerStyle.totalPages)
				? this.enable()
				: this.disable();
		}

		if (this.pagerStyle.button === 'number')
		{
			(this.pagerStyle.page != this.pagerStyle.currentPage)
				? this.enable()
				: this.disable();
		}
	}

	enable() {
		this.color = '#000';
		this.cursor = 'pointer';
		this.pointerEvents = 'auto';
	}

	disable() {
		this.color = '#dcdcdc';
		this.pointerEvents = 'none';
	}
}
