import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'app-table-head',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `<app-table-row></app-table-row>`,
})
export class TableHeadComponent {}
