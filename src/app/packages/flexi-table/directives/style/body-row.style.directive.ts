import { Directive, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs';

import { TableDataService } from '../../data/data.service';

@Directive({
	selector: '[bodyRowStyle]'
})
export class BodyRowStyleDirective implements OnInit, OnDestroy {
	stylesSub: Subscription;
	selectableSub: Subscription;

	@HostBinding('style.height') height: string;
	@HostBinding('style.cursor') cursor: string;

	constructor(public tableData: TableDataService) {}

	ngOnInit(): void {
		this.stylesSub = this.tableData.styles$.subscribe(styles => {
			// this.height = (styles && styles.body) ? styles.body.rowHeight : '60px';
		})

		this.selectableSub = this.tableData.init$.subscribe(init => this.cursor = (init.selectable) ? 'pointer' : 'default')
	}

	ngOnDestroy(): void {
		this.stylesSub.unsubscribe();
		this.selectableSub.unsubscribe();
	}
}
