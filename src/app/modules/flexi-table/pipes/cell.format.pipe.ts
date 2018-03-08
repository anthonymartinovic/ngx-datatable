import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
	name: 'formatCell',
})

export class CellFormatPipe implements PipeTransform {

	constructor(private currencyPipe: CurrencyPipe) {}

	transform(value: any, format: string) : any {
		if (value === undefined) return 'N/A';

		if (format === 'currency') return this.currencyPipe.transform(value, 'AUD');

		if (format === 'default') 
		{
			if (Array.isArray(value)) 
			{
				return (typeof value[0] !== 'object') 
					? value.join(', ') 
					: value.map(obj => { return obj.name; }).join(', ');
			}

			if (typeof value === 'object') return value.name;
		}

		return value;
	}
}
