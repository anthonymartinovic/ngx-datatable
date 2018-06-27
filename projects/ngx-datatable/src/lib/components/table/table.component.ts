import { Component, ChangeDetectionStrategy } from '@angular/core';

import { TableDataService } from '../../data/data.service';

@Component({
	selector: 'ngx-table',
	host: { 'class': 'table' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<ngx-table-head></ngx-table-head>
		<ngx-table-body>/ngx-table-body>
	`
})
export class TableComponent {
	
	constructor(public tableData: TableDataService) {}
}
