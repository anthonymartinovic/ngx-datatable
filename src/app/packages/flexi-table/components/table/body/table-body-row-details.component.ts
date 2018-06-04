import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'ngx-table-body-row-details',
	host: { 'class': 'table-body-row-details' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<ng-container *ngIf="record">
			<div *ngFor="let item of record | formatObject; let i = index" class="row-detail-pair">
				<div class="row-detail-key">{{item[0]}}:</div>
				<div class="row-detail-value">{{item[1]}}</div>
			</div>
		</ng-container>
	`,
})
export class TableBodyRowDetailsComponent {
	@Input() record: {};
}
