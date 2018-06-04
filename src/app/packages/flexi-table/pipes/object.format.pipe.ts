import { Pipe, PipeTransform } from '@angular/core';

import { ObjectService } from '../services/object.service';

@Pipe({
	name: 'formatObject',
	pure: false
})
export class ObjectFormatPipe implements PipeTransform {

	constructor (private objNGX: ObjectService) {}

	transform = (object: any): any[] =>
		this.objNGX.getNestedKeys(object).map(key => new Array(key, this.objNGX.getNestedProperty(object, key)));
}
