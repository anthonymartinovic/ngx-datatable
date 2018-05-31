import { Injectable, Renderer2, RendererFactory2, Inject } from '@angular/core';

@Injectable()
export class RecordsFormatterService {
	private _renderer: Renderer2;

	private _headers: string[];

	constructor(private _rendererFactory: RendererFactory2) {
		this._renderer = _rendererFactory.createRenderer(null, null);
	}

	formatToCSV(records: {}[], download: boolean): void {
		this._headers = [];

		const	formattedRecords = this._csvConvert([...records]);

		for (let record of formattedRecords)
		{
			if (record.startsWith(`obj.0.`))
			{
				let objectPath = '',
					pathArray = record.substring(0, record.indexOf('=')).split('.');

				for (let i = 2; i < pathArray.length; i++) objectPath = objectPath.concat(`${pathArray[i]}.`);

				if (pathArray[2]) objectPath = objectPath.slice(0, -2);

				this._headers.push(objectPath);
			}
			else break;
		}

		const mappedRecords = records.map(row => this._headers.map(fieldName => {
			const value = fieldName.split('.').reduce((part,index) => part[index], row);
			return (value && value.includes(',')) ? value.replace(',', '') : value;
		}).join(','));

		mappedRecords.unshift(this._headers.join(',').replace(/\./g, '/'));
		
		const csv = mappedRecords.join('\r\n');

		if (download) this._downloadFile(csv, 'csv');
	}

	formatToJSON(records: {}[], download: boolean): void {
		const json = JSON.stringify([...records], null, 2);
		if (download) this._downloadFile(json, 'json');
	}

	private _csvConvert(records: {}[], prefix: string = 'obj') {
		return Object.keys(records).reduce((accumulator, key) => {
			const value = records[key];

			if (value === null || value === undefined) accumulator.push(prefix + '.' + key + ' = ' + '');
			else 
				(typeof value === 'object')
					? accumulator.push.apply(accumulator, this._csvConvert(value, prefix + '.' + key))
					: accumulator.push(prefix + '.' + key + ' = ' + value);
			
			return accumulator;
		}, []);
	}

	private _downloadFile(data: {}[] | string, format: string): void {
		let blob;

		if (format === 'csv')  blob = new Blob(['\ufeff' + data], { type: 'text/csv;charset=utf-8;' });
		if (format === 'json') blob = new Blob([data], { type: 'text/json' });

		const	downloadLink    = this._renderer.createElement('a'),
				url             = URL.createObjectURL(blob);

		this._renderer.setAttribute(downloadLink, 'href', url);
		this._renderer.setAttribute(downloadLink, 'download', `ngx-flexi-table.${format}`);
		this._renderer.setStyle(downloadLink, 'visibility', 'hidden');

		this._renderer.appendChild(document.body, downloadLink);
		downloadLink.click();
		this._renderer.removeChild(document.body, downloadLink);
	}
}
