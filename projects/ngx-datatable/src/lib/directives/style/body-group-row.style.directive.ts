import { Directive, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs';

import { TableDataService } from '../../data';

@Directive({
	selector: '[bodyGroupRowStyle]'
})
export class BodyGroupRowStyleDirective {
	stylesSub: Subscription;

	@HostBinding('style.height') height: string;

	constructor(public tableData: TableDataService) {}

	ngOnInit(): void {
		this.stylesSub = this.tableData.styles$.subscribe(styles => {
			this.height = (styles && styles.content.groupRowHeight) ? styles.content.groupRowHeight : '30px';
		})
	}

	ngOnDestroy(): void {
		this.stylesSub.unsubscribe();
	}
}
