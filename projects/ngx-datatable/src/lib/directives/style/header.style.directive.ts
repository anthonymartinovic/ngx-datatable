import { Directive, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs';

import { TableDataService } from '../../data/data.service';

@Directive({
	selector: '[headerStyle]'
})
export class HeaderStyleDirective {
	stylesSub: Subscription;

	@HostBinding('style.height') height: string;

	constructor(public tableData: TableDataService) {}

	ngOnInit(): void {
		this.stylesSub = this.tableData.styles$.subscribe(styles => {
			this.height = (styles && styles.header) ? styles.header.height : '60px';
		})
	}

	ngOnDestroy(): void {
		this.stylesSub.unsubscribe();
	}
}
