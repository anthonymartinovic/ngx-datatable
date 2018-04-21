import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FlexiTableComponent } from './ngx-flexi-table.component';
import { TableComponent } from './components/table/table.component';
import { TableHeadComponent } from './components/table/head/table-head.component';
import { TableHeadRowComponent } from './components/table/head/table-head-row.component';
import { TableHeadCellComponent } from './components/table/head/table-head-cell.component';
import { TableBodyComponent } from './components/table/body/table-body.component';
import { TableBodyGroupComponent } from './components/table/body/table-body-group.component';
import { TableBodyRowComponent } from './components/table/body/table-body-row.component';
import { TableBodyRowDetailComponent } from './components/table/body/table-body-row-detail.component';
import { TableBodyCellComponent } from './components/table/body/table-body-cell.component';
import { FilterComponent } from './components/filter/filter.component';
import { PagerComponent } from './components/pager/pager.component';
import { PagerLiComponent } from './components/pager/pager-li.component';

import { CellStyleDirective } from './directives/style/cell.style.directive';
import { HeadRowStyleDirective } from './directives/style/head-row.style.directive';
import { BodyRowStyleDirective } from './directives/style/body-row.style.directive';
import { PagerStyleDirective } from './directives/style/pager.style.directive';
import { StopPropagationClickDirective } from './directives/event/stop-propagation.click.directive';

import { CellFormatPipe } from './pipes/cell.format.pipe';
import { GroupPipe } from './pipes/group.pipe';

import { ArrayComparatorService } from './services/array-comparator.service';
import { ErrorHandlerService } from './services/error-handler.service';
import { FilterService } from './services/filter.service';
import { ImgService } from './services/img.service';
import { PagerService } from './services/pager.service';
import { RecordsFormatterService } from './services/records-formatter.service';
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
		TableBodyGroupComponent,
		TableBodyRowComponent,
		TableBodyRowDetailComponent,
		TableBodyCellComponent, 
		FilterComponent,
		PagerComponent, 
		PagerLiComponent, 

		CellStyleDirective, 
		HeadRowStyleDirective,
		BodyRowStyleDirective,
		PagerStyleDirective, 
		StopPropagationClickDirective,

		CellFormatPipe,
		GroupPipe
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
		RecordsFormatterService,
		SortService
	],
	exports: [FlexiTableComponent],
})

export class FlexiTableModule {}
