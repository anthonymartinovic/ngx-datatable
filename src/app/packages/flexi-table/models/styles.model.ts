export interface Styles {
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
		rowHeight: string
	};
	footer?: {
		height: string
	};
}