import { Pipe, PipeTransform } from '@angular/core';

import { ObjectComparatorService } from '../services/object-comparator.service';

@Pipe({
	name: 'groupBy',
	pure: false,
})
export class GroupPipe implements PipeTransform {

	constructor(private objNGX: ObjectComparatorService) {}

	transform(pagedRecords: any, selectedGroup: string, groupValue: any): any {
		for (let record of pagedRecords)
			pagedRecords = pagedRecords.filter(record => this.objNGX.getNestedProperty(record, selectedGroup) === groupValue);

		return pagedRecords;
	}
}
