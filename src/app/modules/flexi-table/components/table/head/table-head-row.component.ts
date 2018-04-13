import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, AfterViewInit, OnChanges } from '@angular/core';
import { ColumnMap } from '../../../models/column.model';
import { TableDataService } from '../table.data.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'ngx-table-head-row',
	host: { 'class': 'table-head-row' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<ng-container *ngIf="columns">
			<ng-container *ngFor="let col of columns">
				<ngx-table-head-cell
					[headerType]="'standard'"
					[column]="col"
					[value]="col.header"
				></ngx-table-head-cell>
			</ng-container>
			<ngx-table-head-cell
				[headerType]="'newTab'"
				[value]="newTabCaption"
			></ngx-table-head-cell>
			<ngx-table-head-cell
				[headerType]="'checkbox'"
			></ngx-table-head-cell>
		</ng-container>
	`
})
export class TableHeadRowComponent implements OnInit, OnDestroy {
	columnsSub: Subscription;
	newTabCaptionSub: Subscription;

	columns: ColumnMap[];
	newTabCaption: string;

	constructor(private _tableData: TableDataService) {}

	ngOnInit(): void {
		this.columnsSub = this._tableData.columns$.subscribe(columns => this.columns = columns);
		this.newTabCaptionSub = this._tableData.newTabCaption$.subscribe(newTabCaption => this.newTabCaption = newTabCaption);
	}

	ngOnDestroy(): void {
		this.columnsSub.unsubscribe();
		this.newTabCaptionSub.unsubscribe();
	}
}
