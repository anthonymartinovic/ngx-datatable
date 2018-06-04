export class Init {
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
		type: string,
		keys: string | string[]
	} = {
		show: false,
		type: '',
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