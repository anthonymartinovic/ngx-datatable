import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'ngx-table-head',
	host: { 'class': 'table-head' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `<ngx-table-head-row headRowStyle></ngx-table-head-row>`,
})
export class TableHeadComponent {}
