import { Component, OnInit, Input } from '@angular/core';
import { TableDataService } from '../table.data.service';
import { Subscription } from 'rxjs/Subscription';
import { ColumnMap } from '../../../models/column.model';

@Component({
	selector: 'ngx-table-body-row',
	template: `
		<ng-container *ngIf="columns">
			<ng-container *ngFor="let column of columns">
				<ngx-table-data
					[dataType]="'standard'"
					[column]="column"
					[value]="record"
				></ngx-table-data>
			</ng-container>
			<ngx-table-data [dataType]="'newTab'"></ngx-table-data>
			<ngx-table-data [dataType]="'checkbox'" [value]="record"></ngx-table-data>
		</ng-container>
	`
})
export class TableBodyRowComponent implements OnInit {
	columnsSub: Subscription;
	columns: ColumnMap[];
	
	@Input() record: {};

	constructor(private _tableData: TableDataService) {}

	ngOnInit(): void {
		this.columnsSub = this._tableData.columns$.subscribe(columns => this.columns = columns);
	}

	ngOnDestroy(): void {
		this.columnsSub.unsubscribe();
	}
}
