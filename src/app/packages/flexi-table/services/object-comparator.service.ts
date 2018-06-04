import { Injectable } from '@angular/core';

@Injectable()
export class ObjectComparatorService {

	hasOwnNestedProperty(object: {}, propertyPath: string): boolean {
		const	properties = propertyPath.split('.');

		for (let prop of properties) {
			if (!object || !object.hasOwnProperty(prop)) return false;
			else object = object[prop];
		}

		return true;
	}

	getNestedProperty(object: {}, propertyPath: string): any {
		try
		{
			const separator = '.';
		
			return propertyPath
				.replace('[', separator)
				.replace(']','')
				.split(separator)
				.reduce((item, prop) => item[prop], object);
		}
		catch (err) { return undefined }
	}

	getNestedKeys(object: {}, prefix: string = ''): string[] {
		return Object.keys(object)
			.reduce((item, prop) => {
				if (Array.isArray(object[prop])) return item;

				else if (object[prop] != null && typeof(object[prop]) === 'object')
					return [...item, ...this.getNestedKeys(object[prop], prefix + prop + '.')];

				else return [...item, prefix + prop];
			}, []);
	}
}
