import { Injectable } from '@angular/core';

@Injectable()
export class ArrayComparatorService {
	arrayEquals(a: any[], b: any[], shallow: boolean): boolean {
		if (a.length !== b.length) return false;

		if (shallow) return true;

		let aFirstKey = Object.keys(a[0])[0],
			bFirstKey = Object.keys(b[0])[0];

		a = a.sort((x, y) => x[`${aFirstKey}`] - y[`${bFirstKey}`]);
		b = b.sort((x, y) => x[`${aFirstKey}`] - y[`${bFirstKey}`]);

		return JSON.stringify(a) === JSON.stringify(b);
	}

	arrayIncludesAll(a: any[], b: any[]): boolean {
		for (let i = 0; i < a.length; i++) if (b.indexOf(a[i]) === -1) return false;
		return true;
	}

	arrayIncludesNone(a: any[], b: any[]): boolean {
		const arrayCheck = a.find(item => b.indexOf(item) > -1);
		return (arrayCheck) ? false : true;
	}
}
