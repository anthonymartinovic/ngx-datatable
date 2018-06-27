import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { NgxDatatableComponent } from './ngx-datatable.component';

// import {
// 	ExporterComponent,
// 	FilterComponent,
// 	PagerComponent,
// 	PagerLiComponent,
// 	TableComponent,
// 	TableHeadComponent,
// 	TableHeadCellComponent,
// 	TableHeadRowComponent,
// 	TableBodyComponent,
// 	TableBodyCellComponent,
// 	TableBodyGroupComponent,
// 	TableBodyRowComponent,
// 	TableBodyRowDetailsComponent
// } from './components';

import { ExporterComponent } from './components/exporter/exporter.component';
import { FilterComponent } from './components/filter/filter.component';
import { PagerComponent } from './components/pager/pager.component';
import { PagerLiComponent } from './components/pager/pager-li.component';
import { TableComponent } from './components/table/table.component';
import { TableHeadComponent } from './components/table/head/table-head.component';
import { TableHeadCellComponent } from './components/table/head/table-head-cell.component';
import { TableHeadRowComponent } from './components/table/head/table-head-row.component';
import { TableBodyComponent } from './components/table/body/table-body.component';
import { TableBodyCellComponent } from './components/table/body/table-body-cell.component';
import { TableBodyGroupComponent } from './components/table/body/table-body-group.component';
import { TableBodyRowComponent } from './components/table/body/table-body-row.component';
import { TableBodyRowDetailsComponent } from './components/table/body/table-body-row-details.component';

// import {
// 	StopPropagationEventDirective,
// 	BodyGroupRowStyleDirective,
// 	BodyRowStyleDirective,
// 	CellStyleDirective,
// 	FooterStyleDirective,
// 	HeaderStyleDirective,
// 	HeadRowStyleDirective,
// 	PagerStyleDirective
// } from './directives';

import { StopPropagationEventDirective } from './directives/event/stop-propagation.event.directive';
import { BodyGroupRowStyleDirective } from './directives/style/body-group-row.style.directive';
import { BodyRowStyleDirective } from './directives/style/body-row.style.directive';
import { CellStyleDirective } from './directives/style/cell.style.directive';
import { FooterStyleDirective } from './directives/style/footer.style.directive';
import { HeaderStyleDirective } from './directives/style/header.style.directive';
import { HeadRowStyleDirective } from './directives/style/head-row.style.directive';
import { PagerStyleDirective } from './directives/style/pager.style.directive';

// import {
// 	GroupPipe,
// 	CellFormatPipe,
// 	ObjectFormatPipe
// } from './pipes';

import { CellFormatPipe } from './pipes/cell.format.pipe';
import { GroupPipe } from './pipes/group.pipe';
import { ObjectFormatPipe } from './pipes/object.format.pipe';

// import {
// 	ArrayService,
// 	FilterService,
// 	ImgService,
// 	ObjectService,
// 	PagerService,
// 	FormatService,
// 	SortService,
// } from './services';

import { ArrayService } from './services/array.service';
import { FilterService } from './services/filter.service';
import { ImgService } from './services/img.service';
import { ObjectService } from './services/object.service';
import { PagerService } from './services/pager.service';
import { FormatService } from './services/format.service';
import { SortService } from './services/sort.service';


@NgModule({
	imports: [CommonModule],
	declarations: [
		NgxDatatableComponent,
		ExporterComponent,
		FilterComponent,
		PagerComponent,
		PagerLiComponent,
		TableComponent,
		TableBodyComponent,
		TableBodyCellComponent,
		TableBodyGroupComponent,
		TableBodyRowComponent,
		TableBodyRowDetailsComponent,
		TableHeadComponent,
		TableHeadCellComponent,
		TableHeadRowComponent,

		StopPropagationEventDirective,
		BodyGroupRowStyleDirective,
		BodyRowStyleDirective,
		CellStyleDirective,
		FooterStyleDirective,
		HeaderStyleDirective,
		HeadRowStyleDirective,
		PagerStyleDirective,

		GroupPipe,
		CellFormatPipe,
		ObjectFormatPipe,
	],
	providers: [
		CurrencyPipe,
		
		ArrayService,
		FilterService,
		FormatService,
		ImgService,
		ObjectService,
		PagerService,
		SortService
	],
	exports: [NgxDatatableComponent]
})

export class NgxDatatableModule {}