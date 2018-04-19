import { Directive, OnInit, OnDestroy, ElementRef, Renderer2, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { TableDataService } from '../../data/table.data.service';

@Directive({
	selector: '[headRowStyle]'
})
export class HeadRowStyleDirective implements OnInit, OnDestroy {
	stylesSub: Subscription;

	@HostBinding('style.height') height: string;

	constructor(
		public tableData: TableDataService,
		private _elementRef: ElementRef, 
		private _renderer: Renderer2
	) {}

	ngOnInit(): void {
		this.stylesSub = this.tableData.styles$.subscribe(styles => {
			this.height = (styles && styles.head) ? styles.head.rowHeight : '60px';
		})
	}

	ngOnDestroy(): void {
		this.stylesSub.unsubscribe();
	}
}
