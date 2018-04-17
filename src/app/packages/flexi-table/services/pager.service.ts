import { Injectable } from '@angular/core';
import { PagerModel } from '../models/pager.model';

@Injectable()
export class PagerService {
	getPager(totalRecords: number, currentPage: number = 1, pageSize: number = 10): PagerModel {
		let startPage,
			startIndex = (currentPage - 1) * pageSize,
			endPage,
			endIndex = Math.min(startIndex + pageSize - 1, totalRecords - 1),
			selectablePages,
			totalPages = Math.ceil(totalRecords / pageSize);

		if (totalPages <= 10) 
		{
			startPage = 1;
			endPage = totalPages;
		}
		else if (currentPage <= 6) 
		{
			startPage = 1;
			endPage = 10;
		} 
		else if (currentPage + 4 >= totalPages) 
		{
			startPage = totalPages - 9;
			endPage = totalPages;
		} 
		else 
		{
			startPage = currentPage - 5;
			endPage = currentPage + 4;
		}

		selectablePages = Array.from(Array(endPage - startPage + 1), (page , i) => startPage + i);

		return {
			totalRecords: totalRecords,
			currentPage: currentPage,
			pageSize: pageSize,
			startPage: startPage,
			startIndex: startIndex,
			endPage: endPage,
			endIndex: endIndex,
			selectablePages: selectablePages,
			totalPages: totalPages
		};
	}
}
