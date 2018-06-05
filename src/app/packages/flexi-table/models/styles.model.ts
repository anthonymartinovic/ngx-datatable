export interface Styles {
	template: {
		type: 'grid' | 'flex' | 'none',
		theme: 'basic' | 'none'
	}
	table?: {
		width: string
	};
	head?: {
		groupHeight: string,
		rowHeight: string
	};
	body?: {
		rowHeight: string
	}
	pager?: {
		rowHeight: string
	}
}