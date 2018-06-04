import { Pipe, PipeTransform } from '@angular/core';

import { ObjectComparatorService } from '../services/object-comparator.service';

@Pipe({
	name: 'formatObject',
	pure: false
})
export class ObjectFormatPipe implements PipeTransform {

	constructor (private objNGX: ObjectComparatorService) {}

	transform = (object: any): any[] =>
		this.objNGX.getNestedKeys(object).map(key => new Array(key, this.objNGX.getNestedProperty(object, key)));
}
