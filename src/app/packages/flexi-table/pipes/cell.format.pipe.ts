import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
	name: 'formatCell',
	pure: false
})
export class CellFormatPipe implements PipeTransform {

	constructor(
		private _currencyPipe: CurrencyPipe
	) {}

	transform(input: any, format: string): string {
		if (input === undefined) return 'N/A';

		if (format === 'currency') return this._currencyPipe.transform(input, 'AUD');

		if (format === 'default') 
		{
			if (Array.isArray(input)) 
			{
				return (typeof input[0] !== 'object') 
					? input.join(', ')
					: input.map(object => { 
							return 'N/A'; 
						}).join(', ');
			}

			if (typeof input === 'object') return 'N/A';
		}

		return input;
	}	
}
