import { Injectable } from '@angular/core';

@Injectable()
export class SortService {
	
	constructor() { }

	static _resolveSort(a: any, b: any, order: string): number {
		let result: any;

		if (a === null || a === undefined) return 1;
		if (b === null || b === undefined) return -1;
		if ((a === null || a === undefined) && (b === null || b === undefined)) return 0;

		result = a - b;

		if (isNaN(result)) 
		{
			return (order === 'asc') 
				? a.toString().localeCompare(b) 
				: b.toString().localeCompare(a);
		}
		else 
		{
			return (order === 'asc') 
				? result 
				: -result;
		}
	}

	sortRecords(records: any, column: { name: any, order: string }): {}[] {
		return records.sort((a, b) => {
			return SortService._resolveSort(a[column.name], b[column.name], column.order);
		});
	}
}
