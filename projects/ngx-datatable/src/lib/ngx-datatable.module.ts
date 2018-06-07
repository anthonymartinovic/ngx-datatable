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

import { CellStyleDirective } from './directives/style/table/cell.style.directive';
import { FooterDirective } from './directives/style/footer.directive';
import { HeaderDirective } from './directives/style/header.directive';
import { HeadRowStyleDirective } from './directives/style/table/head-row.style.directive';
import { BodyGroupRowStyleDirective } from './directives/style/table/body-group-row.directive';
import { BodyRowStyleDirective } from './directives/style/table/body-row.style.directive';
import { PagerStyleDirective } from './directives/style/pager/pager.style.directive';
import { StopPropagationClickDirective } from './directives/event/stop-propagation.click.directive';

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

		CellStyleDirective,
		FooterDirective,
		HeaderDirective,
		HeadRowStyleDirective,
		BodyGroupRowStyleDirective,
		BodyRowStyleDirective,
		PagerStyleDirective, 
		StopPropagationClickDirective,

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
