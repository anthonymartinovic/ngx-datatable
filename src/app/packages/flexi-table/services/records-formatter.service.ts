import { Injectable, Renderer2, RendererFactory2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class RecordsFormatterService {
	private _renderer: Renderer2;

	constructor(
		private _rendererFactory: RendererFactory2, 
		@Inject(DOCUMENT) private document
	) {
		this._renderer = _rendererFactory.createRenderer(null, null);
	}

	formatToCSV(records: {}[], download: boolean): void {
		let csv,
			formattedRecords;

		const recordsToFormat = [...records],
			  header          = Object.keys(recordsToFormat[0]),
			  replacer        = (key, value) => value === null ? '' : value;
		
		formattedRecords = recordsToFormat.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
		formattedRecords.unshift(header.join(','));
		
		csv = formattedRecords.join('\r\n');

		if (download) this._downloadFile(csv, 'csv');
	}

	formatToJSON(records: {}[], download: boolean): void {
		let json = JSON.stringify([...records], null, 2);
		if (download) this._downloadFile(json, 'json');
	}

	private _downloadFile(data: {}[] | string, format: string): void {
		let blob;

		if (format === 'csv')  blob = new Blob(['\ufeff' + data], { type: 'text/csv;charset=utf-8;' });
		if (format === 'json') blob = new Blob([data], { type: 'text/json' });

		const downloadLink    = this._renderer.createElement('a'),
			  url             = URL.createObjectURL(blob);

		this._renderer.setAttribute(downloadLink, 'href', url);
		this._renderer.setAttribute(downloadLink, 'download', `ngx-flexi-table.${format}`);
		this._renderer.setStyle(downloadLink, 'visibility', 'hidden');

		this._renderer.appendChild(this.document.body, downloadLink);
		downloadLink.click();
		this._renderer.removeChild(this.document.body, downloadLink);
	}
}
