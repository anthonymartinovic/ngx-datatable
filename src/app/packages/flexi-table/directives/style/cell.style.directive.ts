import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';

@Directive({
	selector: '[cellStyle]',
})
export class CellStyleDirective implements OnInit {
	@Input() cellStyle: string;

	constructor(
		private _elementRef: ElementRef, 
		private _renderer: Renderer2
	) {}

	ngOnInit() {	
		if (this.cellStyle === undefined)
		{
			this._renderer.setStyle(this._elementRef.nativeElement, 'color', '#dcdcdc');
			this._renderer.setStyle(this._elementRef.nativeElement, 'text-align', 'center');
		}

		if (this.cellStyle === 'checkbox' || 
			this.cellStyle === 'newTab' || 
			typeof this.cellStyle === 'number')
		{
			this._renderer.setStyle(this._elementRef.nativeElement, 'text-align', 'right');
		}
	}
}
