import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { TableDataService } from './table.data.service';

@Component({
	selector: 'ngx-table',
	host: { 'class': 'table' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caption *ngIf="caption" class="table-caption">{{ caption }}</caption>
		<ngx-table-head></ngx-table-head>
		<ngx-table-body>/ngx-table-body>
	`
})
export class TableComponent {
	@Input() caption: string;

	constructor(public tableData: TableDataService) {}
}
