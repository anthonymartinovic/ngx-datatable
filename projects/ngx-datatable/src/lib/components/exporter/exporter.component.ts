import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { DT_Init } from '../../models';
import { FormatService } from '../../services';

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
				[disabled]="checkedRecords && !checkedRecords.length"
				(click)="exportRecords('csv', true)"
			>
				Export selected data (CSV)
			</button>
			<button 
				type="button" 
				class="export-button"
				[disabled]="checkedRecords && !checkedRecords.length"
				(click)="exportRecords('json', true)"
			>
				Export selected data (JSON)
			</button>
		</div>
	`,
})
export class ExporterComponent {
	@Input() init: DT_Init;
	@Input() records: {}[];
	@Input() checkedRecords: {}[];

	@Output() serverExportAll: EventEmitter<string> = new EventEmitter();

	constructor(private formatService: FormatService) {}

	exportRecords(format: string, checked: boolean): void {
		if (this.init.server && format === 'csv' && !checked) return this.serverExportAll.emit('csv');
		if (this.init.server && format === 'json' && !checked) return this.serverExportAll.emit('json');

		if (format === 'csv' && !checked) this.formatService.formatToCSV(this.records, true);
		if (format === 'json' && !checked) this.formatService.formatToJSON(this.records, true);

		if (format === 'csv' && checked) this.formatService.formatToCSV(this.checkedRecords, true);
		if (format === 'json' && checked) this.formatService.formatToJSON(this.checkedRecords, true);
	}
}
