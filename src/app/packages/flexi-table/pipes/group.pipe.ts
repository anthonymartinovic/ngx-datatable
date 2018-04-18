import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'groupBy',
	pure: false,
})
export class GroupPipe implements PipeTransform {

	transform(pagedRecords: any, selectedGroup: string, groupValue: any): any {
		for (let record of pagedRecords)
			pagedRecords = pagedRecords.filter(record => record[selectedGroup] === groupValue);

		return pagedRecords;
	}
}
