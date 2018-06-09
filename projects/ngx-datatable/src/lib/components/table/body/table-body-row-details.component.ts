import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { ArrayService } from '../../../services';

@Component({
	selector: 'ngx-table-body-row-details',
	host: { 'class': 'table-body-row-details' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<ng-container *ngIf="record">
			<div *ngFor="let item of record | formatObject; let i = index; trackBy: arrayService.trackByFn" class="row-detail-pair">
				<div class="row-detail-key">{{item[0]}}:</div>
				<div class="row-detail-value">{{item[1]}}</div>
			</div>
		</ng-container>
	`,
})
export class TableBodyRowDetailsComponent {
	@Input() record: {};
	
	constructor(public arrayService: ArrayService) {}
}
