export class DT_Init {
	loader: boolean         = false;
	server: boolean         = false;
	header: boolean         = true;
	footer: boolean         = true;
	caption?: string        = '';
	exportOptions?: boolean = false;
	selectable?: boolean    = false;
	checkboxes?: boolean    = false;
	rowDetail?: boolean     = false;
	groupBy?: string[]      = [];
	pageLimit?: number      = 10;
	filter?: {
		show: boolean,
		type: 'global' | 'columns',
		keys: string | string[]
	} = {
		show: false,
		type: 'global',
		keys: ''
	};
	newTab?: {
		show: boolean,
		caption: string,
		keys: string[]
	} = {
		show: false,
		caption: '',
		keys: []
	};
}