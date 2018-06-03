import { Injectable } from '@angular/core';

@Injectable()
export class ObjectComparatorService {

	hasOwnNestedProperty(record: {}, propertyPath: string): boolean {
		const	properties = propertyPath.split('.');

		for (let prop of properties) {
			if (!record || !record.hasOwnProperty(prop)) return false;
			else record = record[prop];
		}

		return true;
	}

	getNestedProperty(record: {}, propertyPath: string) {
		try
		{
			const separator = '.';
		
			return propertyPath
					.replace('[', separator)
					.replace(']','')
					.split(separator)
					.reduce((item, prop) => item[prop], record);
		}
		catch (err) { return undefined }
	}
}
