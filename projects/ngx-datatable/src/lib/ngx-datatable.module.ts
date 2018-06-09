import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgxDatatableComponent } from './ngx-datatable.component';
import { TableComponent } from './components/table/table.component';
import { TableHeadComponent } from './components/table/head/table-head.component';
import { TableHeadRowComponent } from './components/table/head/table-head-row.component';
import { TableHeadCellComponent } from './components/table/head/table-head-cell.component';
import { TableBodyComponent } from './components/table/body/table-body.component';
import { TableBodyGroupComponent } from './components/table/body/table-body-group.component';
import { TableBodyRowComponent } from './components/table/body/table-body-row.component';
import { TableBodyRowDetailsComponent } from './components/table/body/table-body-row-details.component';
import { TableBodyCellComponent } from './components/table/body/table-body-cell.component';
import { FilterComponent } from './components/filter/filter.component';
import { PagerComponent } from './components/pager/pager.component';
import { PagerLiComponent } from './components/pager/pager-li.component';

import {
	StopPropagationEventDirective,
	BodyGroupRowStyleDirective,
	BodyRowStyleDirective,
	CellStyleDirective,
	FooterStyleDirective,
	HeaderStyleDirective,
	HeadRowStyleDirective,
	PagerStyleDirective
} from './directives';

import { CellFormatPipe } from './pipes/cell.format.pipe';
import { GroupPipe } from './pipes/group.pipe';
import { ObjectFormatPipe } from './pipes/object.format.pipe';

import { ArrayService } from './services/array.service';
import { ErrorHandlerService } from './services/error-handler.service';
import { FilterService } from './services/filter.service';
import { ImgService } from './services/img.service';
import { ObjectService } from './services/object.service';
import { PagerService } from './services/pager.service';
import { FormatService } from './services/format.service';
import { SortService } from './services/sort.service';
import { ExporterComponent } from './components/exporter/exporter.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule
	],
	declarations: [
		NgxDatatableComponent, 
		TableComponent, 
		TableHeadComponent, 
		TableHeadRowComponent,
		TableHeadCellComponent,
		TableBodyComponent, 
		TableBodyGroupComponent,
		TableBodyRowComponent,
		TableBodyRowDetailsComponent,
		TableBodyCellComponent, 
		FilterComponent,
		PagerComponent, 
		PagerLiComponent, 

		StopPropagationEventDirective,
		BodyGroupRowStyleDirective,
		BodyRowStyleDirective,
		CellStyleDirective,
		FooterStyleDirective,
		HeaderStyleDirective,
		HeadRowStyleDirective,
		PagerStyleDirective, 

		CellFormatPipe,
		GroupPipe,
		ObjectFormatPipe,
		ExporterComponent
	],
	providers: [
		CurrencyPipe,
		
		ArrayService,
		{
			provide: ErrorHandler, 
			useClass: ErrorHandlerService
		},
		FilterService,
		ImgService,
		ObjectService,
		PagerService,
		FormatService,
		SortService
	],
	exports: [NgxDatatableComponent],
})

export class NgxDatatableModule {}
