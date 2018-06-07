import { Injectable } from '@angular/core';

@Injectable()
export class ArrayService {
	trackByFn = (index, item): number => index;

	arrayEquals(a: any[], b: any[], shallow: boolean): boolean {
		if (a.length !== b.length) return false;

		if (shallow) return true;

		let aFirstKey = Object.keys(a[0])[0],
			bFirstKey = Object.keys(b[0])[0];

		a = a.sort((x, y) => x[`${aFirstKey}`] - y[`${bFirstKey}`]);
		b = b.sort((x, y) => x[`${aFirstKey}`] - y[`${bFirstKey}`]);

		return JSON.stringify(a) === JSON.stringify(b);
	}

	arrayIncludes = (a: any, b: any[]): boolean => b.find(item => JSON.stringify(a) === JSON.stringify(item));

	arrayIncludesAll(a: any[], b: any[], server: boolean = false): boolean {
		if (server)
		{
			for (let i = 0; i < a.length; i++)
				if (!this.arrayIncludes(a[i], b)) return false;
			return true;
		}

		for (let i = 0; i < a.length; i++) if (b.indexOf(a[i]) === -1) return false;
		return true;
	}

	arrayIncludesNone(a: any[], b: any[], server: boolean = false): boolean {
		if (server)
		{
			for (let i = 0; i < a.length; i++)
				if (this.arrayIncludes(a[i], b)) return false;
			return true;
		}

		const arrayCheck = a.find(item => b.indexOf(item) > -1);
		return (arrayCheck) ? false : true;
	}
}
