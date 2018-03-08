import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ColumnConfig, ColumnMap } from './models/column.config.model';

@Component({
	selector: 'app-flexi-table',
	template: `<div>
					<h4 *ngIf="caption">{{caption}}</h4>
					<table>
						<thead>
						<tr>
							<th *ngFor="let map of columnMaps">{{ map.header }}</th>
						</tr>
						</thead>
						<tbody>
						<tr *ngFor="let record of records">
							<td *ngFor="let map of columnMaps"
								[flexiCellStyle]="record[map.access(record)]">
								{{ record[map.access(record)] | formatCell: map.format }}
							</td>
						</tr>
						</tbody>
					</table>
				</div>`,
	styleUrls: ['./flexi-table.component.scss'],
	host: {
		class: 'ngx-flexi-table',
	},
})

export class FlexiTableComponent implements OnInit, OnChanges 
{
	@Input() config: ColumnConfig[];
	@Input() caption: string;
	@Input() records: any[];
	columnMaps: ColumnMap[];

	constructor() {}

	ngOnInit() {}

	ngOnChanges() 
	{
		if (this.config) 
		{
			this.columnMaps = this.config.map( col => new ColumnMap(col) );
		} 
		else 
		{
			this.columnMaps = Object.keys(this.records[0]).map(
				key => 
				{
					return new ColumnMap({ primaryKey: key });
				}
			);
		}
	}
}
