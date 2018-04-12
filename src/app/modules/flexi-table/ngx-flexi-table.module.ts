import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { FlexiTableComponent } from './ngx-flexi-table.component';
import { PagerComponent } from './components/pager/pager.component';
import { PagerLiComponent } from './components/pager/pager-li.component';
import { TableComponent } from './components/table/table.component';
import { TableHeadComponent } from './components/table/head/table-head.component';
import { TableBodyComponent } from './components/table/body/table-body.component';
import { TableHeaderComponent } from './components/table/head/table-header.component';
import { TableHeadRowComponent } from './components/table/head/table-head-row.component';

import { CellStyleDirective } from './directives/cell.style.directive';
import { PagerStyleDirective } from './directives/pager.style.directive';

import { CellFormatPipe } from './pipes/cell.format.pipe';

import { ImgService } from './services/img.service';
import { PagerService } from './services/pager.service';
import { SortService } from './services/sort.service';
import { TableDataService } from './components/table/table.data.service';
import { TableHeaderCellComponent } from './components/table/head/table-header-cell.component';
import { TableDataCellComponent } from './components/table/body/table-data-cell.component';
import { TableBodyRowComponent } from './components/table/body/table-body-row.component';
import { TableDataComponent } from './components/table/body/table-data.component';

@NgModule({
	imports: [CommonModule],
	declarations: [
		FlexiTableComponent, 
		PagerComponent, 
		PagerLiComponent, 
		TableComponent, 
		TableHeadComponent, 
		TableBodyComponent, 
		TableHeaderComponent,
		TableHeadRowComponent,

		CellFormatPipe, 

		CellStyleDirective, 
		PagerStyleDirective, TableHeaderCellComponent, TableDataCellComponent, TableBodyRowComponent, TableDataComponent
	],
	providers: [
		CurrencyPipe,
		
		ImgService,
		PagerService,
		SortService
	],
	exports: [FlexiTableComponent],
})

export class FlexiTableModule {}