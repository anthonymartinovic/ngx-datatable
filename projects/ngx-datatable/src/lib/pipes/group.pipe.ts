import { Pipe, PipeTransform } from '@angular/core';

import { ObjectService } from '../services';

@Pipe({
	name: 'groupBy',
	pure: false,
})
export class GroupPipe implements PipeTransform {

	constructor(private objectService: ObjectService) {}

	transform(pagedRecords: any, selectedGroup: string, groupValue: any): any {
		for (let record of pagedRecords)
			pagedRecords = pagedRecords.filter(record => this.objectService.getNestedProperty(record, selectedGroup) === groupValue);

		return pagedRecords;
	}
}
