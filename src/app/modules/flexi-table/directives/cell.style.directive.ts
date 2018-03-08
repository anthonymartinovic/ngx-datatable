import { Directive, ElementRef, Renderer, Input } from '@angular/core';

@Directive({
	selector: '[flexiCellStyle]',
})

export class CellStyleDirective {

	@Input() flexiCellStyle: string;

	constructor(
		private el: ElementRef, 
		private renderer: Renderer
	) {}

	ngOnInit() {

		if (this.flexiCellStyle === undefined)
		{
			this.renderer.setElementStyle(this.el.nativeElement, 'color', '#dcdcdc');
			this.renderer.setElementStyle(this.el.nativeElement, 'text-align', 'center');
		}

		if (typeof this.flexiCellStyle === 'number') 
		{
			this.renderer.setElementStyle(this.el.nativeElement, 'text-align', 'right');
		}

	}
	
}
