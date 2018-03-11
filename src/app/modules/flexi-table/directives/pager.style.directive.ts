import { Directive, Input, ElementRef, Renderer2, OnChanges } from '@angular/core';

@Directive({
	selector: '[flexiPagerStyle]',
})

export class PagerStyleDirective implements OnChanges {
	@Input() flexiPagerStyle:  {
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
		if (this.flexiPagerStyle.button === 'first' || 
			this.flexiPagerStyle.button === 'previous')
		{
			(this.flexiPagerStyle.currentPage != 1)
				? this.enable()
				: this.disable();
		}

		if (this.flexiPagerStyle.button === 'last' || 
			this.flexiPagerStyle.button === 'next')
		{
			(this.flexiPagerStyle.currentPage != this.flexiPagerStyle.totalPages)
				? this.enable()
				: this.disable();
		}

		if (this.flexiPagerStyle.button === 'number')
		{
			(this.flexiPagerStyle.page != this.flexiPagerStyle.currentPage)
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
