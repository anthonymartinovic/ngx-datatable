import { Directive, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { TableDataService } from '../../data/table.data.service';

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

		this.selectableSub = this.tableData.selectableState$.subscribe(selectableState => {
			this.cursor = (selectableState) ? 'pointer' : 'default';
		})
	}

	ngOnDestroy(): void {
		this.stylesSub.unsubscribe();
		this.selectableSub.unsubscribe();
	}
}
