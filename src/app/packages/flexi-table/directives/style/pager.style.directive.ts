import { Directive, Input, ElementRef, Renderer2, OnChanges } from '@angular/core';

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

	constructor(
		private _elementRef: ElementRef, 
		private _renderer: Renderer2
	) {}

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
		this._renderer.setStyle(this._elementRef.nativeElement, 'color', '#000');
		this._renderer.setStyle(this._elementRef.nativeElement, 'pointer-events', 'auto');
		this._renderer.setStyle(this._elementRef.nativeElement, 'cursor', 'pointer');
	}

	disable() {
		this._renderer.setStyle(this._elementRef.nativeElement, 'color', '#dcdcdc');
		this._renderer.setStyle(this._elementRef.nativeElement, 'pointer-events', 'none');
	}
}
