export class TableInit {
	header: boolean        = true;
	footer: boolean        = true;
	caption: string        = '';
	exportOptions: boolean = false;
	selectable: boolean    = false;
	checkboxes: boolean    = false;
	rowDetail: boolean     = false;
	newTab: {
		show: boolean,
		caption: string,
		keys: string[]
}                          = {
								show: false,
								caption: '',
								keys: undefined
							 };
}