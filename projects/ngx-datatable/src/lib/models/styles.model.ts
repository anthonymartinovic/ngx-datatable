export interface DT_Styles {
	template: {
		use: boolean,
		layout: 'flex' | 'grid' | 'none',
		theme: 'basic' | 'none'
	};
	header?: {
		height: string
	};
	content?: {
		headHeight: string,
		groupRowHeight?: string,
		rowHeight: string
	};
	footer?: {
		height: string
	};
}