import { Injectable } from '@angular/core';

import { DT_ColumnMap } from '../models/column.model';

@Injectable()
export class FilterService {
	filterRecords(filterInput: string, filterColumn: string, columns: DT_ColumnMap[], records: {}[]): {}[] {
		const	columnToCheck  = columns.find(column =>
					column.primeKey === filterColumn || (column.altKeys && column.altKeys.indexOf(filterColumn) !== -1)
				),
				keysToCheck    = [columnToCheck.primeKey].concat(columnToCheck.altKeys).filter(key => key != undefined);

		let recordsCopy = [...records];

		return recordsCopy.filter(record => {
			

			for (let key of keysToCheck)
				if (record[key] && record[key].toString().toLowerCase().indexOf(filterInput) !== -1 || !filterInput) return true;
		});
	}

	private _getPropertyValue = (object: any, key: string): any =>
		key.split(".").reduce((item, index) => item[index], object);
}
