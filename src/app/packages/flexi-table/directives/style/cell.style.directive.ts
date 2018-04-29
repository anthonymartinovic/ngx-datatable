import { Directive, Input, OnInit, HostBinding } from '@angular/core';

@Directive({
	selector: '[cellStyle]',
})
export class CellStyleDirective implements OnInit {
	@Input() cellStyle: string;

	@HostBinding('style.color') color: string;
	@HostBinding('style.cursor') cursor: string;
	@HostBinding('style.text-align') textAlign: string;

	ngOnInit() {	
		if (this.cellStyle === undefined)
		{
			this.color = '#dcdcdc';
			this.textAlign = 'center';
		}

		if (this.cellStyle === 'checkbox' || 
			this.cellStyle === 'newTab' || 
			typeof this.cellStyle === 'number')
		{
			this.textAlign = 'right';
		}

		if (this.cellStyle === 'newTab')
		{
			this.cursor = 'default';
		}
	}
}
