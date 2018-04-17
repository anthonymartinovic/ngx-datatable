import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';

@Directive({
	selector: '[flexiCellStyle]',
})
export class CellStyleDirective implements OnInit {
	@Input() flexiCellStyle: string;

	constructor(
		private _elementRef: ElementRef, 
		private _renderer: Renderer2
	) {}

	ngOnInit() {	
		if (this.flexiCellStyle === undefined)
		{
			this._renderer.setStyle(this._elementRef.nativeElement, 'color', '#dcdcdc');
			this._renderer.setStyle(this._elementRef.nativeElement, 'text-align', 'center');
		}

		if (this.flexiCellStyle === 'checkbox' || 
			this.flexiCellStyle === 'newTab' || 
			typeof this.flexiCellStyle === 'number')
		{
			this._renderer.setStyle(this._elementRef.nativeElement, 'text-align', 'right');
		}
	}
}
