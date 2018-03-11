import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'sort',
})

export class SortPipe implements PipeTransform {
	constructor() {}

	transform(input: any, config: any[] = ['+']): any {
		if (!Array.isArray(input)) return input;

		if (!Array.isArray(config) || (Array.isArray(config) && config.length == 1)) 
		{
			let propertyToSort = (!Array.isArray(config)) 
				? config 
				: config[0];

			let descending = propertyToSort.substr(0, 1) == '-';
	  
			if(!propertyToSort || propertyToSort == '-' || propertyToSort == '+')
			{
			  return (!descending) 
				  ? input.sort()
				  : input.sort().reverse();
			}
			else 
			{
			  //is a complex array that is sorting on a single property
			}
		}
		else 
		{
			//is a complex array with multiple properties to sort on
		}

		return null;
	}
}
