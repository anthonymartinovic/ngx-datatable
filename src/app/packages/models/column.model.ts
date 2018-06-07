export interface ColumnConfig {
	primeKey: string;
	altKeys?: string[];
	header?: string;
	format?: string;
}

export class ColumnMap {
	primeKey: string;
	altKeys?: string[];
	private _header: string;
	private _format: string;

	constructor(config) {
		this.primeKey = config.primeKey;
		this.altKeys = config.altKeys;
		this.header = config.header;
		this.format = config.format;
	}

	get header() { 
		return this._header; 
	}

	set header(config: string) {
		this._header = (config)
			? config
			: this.primeKey.slice(0, 1).toUpperCase() + 
			  this.primeKey.replace(/_/g, ' ').slice(1);
	}

	get format() {
		return this._format;
	}

	set format(config: string) {
		this._format = (config) 
			? config 
			: 'default';
	}

	access(object: any, returnKey?: boolean): string {
		if (returnKey)
		{
			if (object[this.primeKey] || !this.altKeys) return this.primeKey;

			for (let key of this.altKeys)
				if (object[key]) return key;
	
			return this.primeKey;
		}
		else
		{
			if (this.primeKey.includes('.'))
				return this._getPropertyValue(object, this.primeKey);
	
			if (object[this.primeKey] || !this.altKeys) return object[this.primeKey]; 
	
			for (let key of this.altKeys)
				if (key.includes('.')) this._getPropertyValue(object, key);
				else if (object[key]) return object[key];
	
			return object[this.primeKey];
		}
	};

	private _getPropertyValue = (object: any, key: string): any =>
		key.split(".").reduce((item, index) => item[index], object);
}
