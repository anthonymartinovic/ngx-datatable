import { Pipe, PipeTransform } from '@angular/core';

import { ObjectService } from '../services/object.service';

@Pipe({
	name: 'formatObject',
	pure: false
})
export class ObjectFormatPipe implements PipeTransform {

	constructor (private objectService: ObjectService) {}

	transform = (object: any): any[] =>
		this.objectService.getNestedKeys(object).map(key => new Array(key, this.objectService.getNestedProperty(object, key)));
}
