import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'formatObject',
	pure: false
})
export class ObjectFormatPipe implements PipeTransform {

	transform(object: any): any[] {
		return Object.keys(object).map(key => new Array(key, object[key]));
	}
}
