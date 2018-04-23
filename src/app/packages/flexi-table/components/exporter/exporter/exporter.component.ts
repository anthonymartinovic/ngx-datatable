import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { RecordsFormatterService } from '../../../services/records-formatter.service';

@Component({
	selector: 'ngx-exporter',
	host: { 'class': 'table-exporter' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="export-options">
			<button 
				type="button" 
				class="export-button" 
				(click)="exportRecords('csv', false)"
			>
				Export all data (CSV)
			</button>
			<button 
				type="button"
				class="export-button" 
				(click)="exportRecords('json', false)"
			>
				Export all data (JSON)
			</button>
			<button 
				type="button" 
				class="export-button" 
				[disabled]="!checkedRecords.length"
				(click)="exportRecords('csv', true)"
			>
				Export selected data (CSV)
			</button>
			<button 
				type="button" 
				class="export-button"
				[disabled]="!checkedRecords.length"
				(click)="exportRecords('json', true)"
			>
				Export selected data (JSON)
			</button>
		</div>
	`,
})
export class ExporterComponent {
	@Input() records: {}[];
	@Input() checkedRecords: {}[];

	constructor(private _recordsFormatter: RecordsFormatterService) {}

	exportRecords(format: string, checked: boolean): void {
		if (format === 'csv' && !checked) this._recordsFormatter.formatToCSV(this.records, true);
		if (format === 'json' && !checked) this._recordsFormatter.formatToJSON(this.records, true);
		if (format === 'csv' && checked) this._recordsFormatter.formatToCSV(this.checkedRecords, true);
		if (format === 'json' && checked) this._recordsFormatter.formatToJSON(this.checkedRecords, true);
	}
}
