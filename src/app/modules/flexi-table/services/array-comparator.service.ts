import { Injectable } from '@angular/core';

@Injectable()
export class ArrayComparatorService {
	arrayEquality(a: any[], b: any[], shallow: boolean): boolean {
		if (a.length !== b.length) return false;

		if (shallow) return true;

		return JSON.stringify(a.sort()) === JSON.stringify(b.sort());
	}
}
