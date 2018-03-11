export class ColumnConfig {
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

	access(object: any): string | number {
		if (object[this.primeKey] || !this.altKeys) 
		{
			return this.primeKey; 
		}

		for (let key of this.altKeys) 
		{
			if (object[key]) return key;
		}

		return this.primeKey;
	};
}
