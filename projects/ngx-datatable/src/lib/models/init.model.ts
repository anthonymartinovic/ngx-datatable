export class DT_Init {
	loader: boolean;
	server: boolean;
	header: boolean;
	footer: boolean;
	caption: string;
	exportOptions: boolean;
	selectable: boolean;
	checkboxes: boolean;
	rowDetail: boolean;
	groupBy: string[];
	pageLimit: number;
	filter: { show: boolean, type: 'global' | 'columns', keys: string | string[] };
	newTab: { show: boolean, caption: string, keys: string[] }; 

	constructor
	(init: {
		loader?: boolean,
		server?: boolean,
		header?: boolean,
		footer?: boolean,
		caption?: string,
		exportOptions?: boolean,
		selectable?: boolean,
		checkboxes?: boolean,
		rowDetail?: boolean,
		groupBy?: string[],
		pageLimit?: number,
		filter?: { show: boolean, type: 'global' | 'columns', keys: string | string[] },
		newTab?: { show: boolean, caption: string, keys: string[] }
	})
	{
		this.loader        = (init.loader) ? init.loader : false;
		this.server        = (init.server) ? init.server : false;
		this.header        = (init.header) ? init.header : false;
		this.footer        = (init.footer) ? init.footer : true;
		this.caption       = (init.caption) ? init.caption : '';
		this.exportOptions = (init.exportOptions) ? init.exportOptions : false;
		this.selectable    = (init.selectable) ? init.selectable : false;
		this.checkboxes    = (init.checkboxes) ? init.checkboxes : false;
		this.rowDetail     = (init.rowDetail) ? init.rowDetail : false;
		this.groupBy       = (init.groupBy) ? init.groupBy : [];
		this.pageLimit     = (init.pageLimit) ? init.pageLimit : 10;
		this.filter        = (init.filter) ? init.filter : { show: false, type: 'global', keys: '' };
		this.newTab        = (init.newTab) ? init.newTab : { show: false, caption: '', keys: [] };
	}
}