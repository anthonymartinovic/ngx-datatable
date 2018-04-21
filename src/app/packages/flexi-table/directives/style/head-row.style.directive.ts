import { Directive, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { TableDataService } from '../../data/table.data.service';

@Directive({
	selector: '[headRowStyle]'
})
export class HeadRowStyleDirective implements OnInit, OnDestroy {
	stylesSub: Subscription;

	@HostBinding('style.height') height: string;

	constructor(public tableData: TableDataService) {}

	ngOnInit(): void {
		this.stylesSub = this.tableData.styles$.subscribe(styles => {
			this.height = (styles && styles.head) ? styles.head.rowHeight : '60px';
		})
	}

	ngOnDestroy(): void {
		this.stylesSub.unsubscribe();
	}
}
