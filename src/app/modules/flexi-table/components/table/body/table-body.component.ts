import { Component, OnDestroy } from '@angular/core';
import { TableDataService } from '../table.data.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'ngx-table-body',
	host: { 'class': 'table-body' },
	template: `
		<ngx-table-body-row *ngFor="let record of pagedRecords" [record]="record"></ngx-table-body-row>
	`
})
export class TableBodyComponent implements OnDestroy {
	pagedRecordsSub: Subscription;
	pagedRecords: {}[];

	constructor(private _tableData: TableDataService) {
		this.pagedRecordsSub = this._tableData.pagedRecords$.subscribe(pagedRecords => this.pagedRecords = pagedRecords);
	}

	ngOnDestroy() {
		this.pagedRecordsSub.unsubscribe();
	}
}
