import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, AfterViewInit, OnChanges } from '@angular/core';
import { ColumnMap } from '../../models/column.model';
import { TableDataService } from './table.data.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-table-row',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<ng-container *ngIf="columns">
			<ng-container *ngFor="let col of columns">
				<app-table-header
					[headerType]="'standard'"
					[column]="col"
					[value]="col.header"
				></app-table-header>
			</ng-container>
			<app-table-header
				[headerType]="'router'"
				[value]="routerCaption"
			></app-table-header>
			<app-table-header
				[headerType]="'checkbox'"
			></app-table-header>
		</ng-container>
	`
})
export class TableRowComponent implements OnInit, OnDestroy {
	columnsSub: Subscription;
	routerCaptionSub: Subscription;

	columns: ColumnMap[];
	routerCaption: string;

	constructor(private _data: TableDataService) {}

	ngOnInit(): void {
		this.columnsSub = this._data.columns$.subscribe(columns => this.columns = columns);
		this.routerCaptionSub = this._data.routerCaption$.subscribe(routerCaption => this.routerCaption = routerCaption);
	}

	ngOnDestroy(): void {
		this.columnsSub.unsubscribe();
		this.routerCaptionSub.unsubscribe();
	}
}
