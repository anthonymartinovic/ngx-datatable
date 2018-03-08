export class ColumnConfig {

	header?: string;
	format?: string;
	primaryKey: string;
	alternativeKeys?: string[];

}

export class ColumnMap {

	private _header: string;
	private _format: string;
	primaryKey: string;
	alternativeKeys?: string[];

	constructor(config) {
		this.header = config.header;
		this.format = config.format;
		this.primaryKey = config.primaryKey;
		this.alternativeKeys = config.alternativeKeys;
	}

	get header() { 
		return this._header; 
	}

	set header(config: string) {
		this._header = (config)
			? config
			: this.primaryKey.slice(0, 1).toUpperCase() + 
			  this.primaryKey.replace(/_/g, ' ').slice(1);
	}

	get format() {
		return this._format;
	}

	set format(config: string) {
		this._format = (config) ? config : 'default';
	}

	access = (object: any) => {

		if (object[this.primaryKey] || !this.alternativeKeys) 
		{ 
			return this.primaryKey; 
		}

		for (let key of this.alternativeKeys) 
		{
			if (object[key]) { return key; }
		}

		return this.primaryKey;

	};
	
}
