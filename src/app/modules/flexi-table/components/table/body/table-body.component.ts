import { Component, ChangeDetectionStrategy } from '@angular/core';

import { TableDataService } from '../table.data.service';

@Component({
	selector: 'ngx-table-body',
	host: { 'class': 'table-body' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<ngx-table-body-row 
			*ngFor="let record of tableData.pagedRecords$ | async" 
			[record]="record"
		></ngx-table-body-row>
	`
})
export class TableBodyComponent {

	constructor(public tableData: TableDataService) {}
}
