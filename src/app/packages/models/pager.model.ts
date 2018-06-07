export interface Pager {
	totalRecords: number;
	currentPage: number;
	pageSize: number;
	startPage: number;
	startIndex: number;
	endPage: number;
	endIndex: number;
	selectablePages: number[];
	totalPages: number;
}

export interface ServerPageData {
	currentPage: number;
	limit: number;
	total: number;
	totalPages: number;
}