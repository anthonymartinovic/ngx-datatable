export interface Styles {
	template: {
		use: boolean,
		layout: 'flex' | 'grid' | 'none',
		theme: 'basic' | 'none'
	};
	head?: {
		height: string
	};
	body?: {
		headerHeight: string,
		rowHeight: string
	};
	footer?: {
		height: string
	};
}