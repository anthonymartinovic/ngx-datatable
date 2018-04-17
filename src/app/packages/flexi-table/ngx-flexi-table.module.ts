import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FlexiTableComponent } from './ngx-flexi-table.component';
import { TableComponent } from './components/table/table.component';
import { TableHeadComponent } from './components/table/head/table-head.component';
import { TableHeadRowComponent } from './components/table/head/table-head-row.component';
import { TableHeadCellComponent } from './components/table/head/table-head-cell.component';
import { TableBodyComponent } from './components/table/body/table-body.component';
import { TableBodyRowComponent } from './components/table/body/table-body-row.component';
import { TableBodyCellComponent } from './components/table/body/table-body-cell.component';
import { FilterComponent } from './components/filter/filter.component';
import { PagerComponent } from './components/pager/pager.component';
import { PagerLiComponent } from './components/pager/pager-li.component';

import { CellStyleDirective } from './directives/cell.style.directive';
import { PagerStyleDirective } from './directives/pager.style.directive';
import { ClickStopPropagationDirective } from './directives/click-stop-propagation.event.directive';

import { CellFormatPipe } from './pipes/cell.format.pipe';

import { ArrayComparatorService } from './services/array-comparator.service';
import { ErrorHandlerService } from './services/error-handler.service';
import { FilterService } from './services/filter.service';
import { ImgService } from './services/img.service';
import { PagerService } from './services/pager.service';
import { SortService } from './services/sort.service';

@NgModule({
	imports: [
		CommonModule,
		FormsModule
	],
	declarations: [
		FlexiTableComponent, 
		TableComponent, 
		TableHeadComponent, 
		TableHeadRowComponent,
		TableHeadCellComponent,
		TableBodyComponent, 
		TableBodyRowComponent,
		TableBodyCellComponent, 
		FilterComponent,
		PagerComponent, 
		PagerLiComponent, 

		CellStyleDirective, 
		PagerStyleDirective, 
		ClickStopPropagationDirective,

		CellFormatPipe
	],
	providers: [
		CurrencyPipe,
		
		ArrayComparatorService,
		{
			provide: ErrorHandler, 
			useClass: ErrorHandlerService
		},
		FilterService,
		ImgService,
		PagerService,
		SortService
	],
	exports: [FlexiTableComponent],
})

export class FlexiTableModule {}
