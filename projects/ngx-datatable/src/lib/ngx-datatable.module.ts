import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { NgxDatatableComponent } from './ngx-datatable.component';
import {
	ExporterComponent,
	FilterComponent,
	PagerComponent,
	PagerLiComponent,
	TableComponent,
	TableHeadComponent,
	TableHeadCellComponent,
	TableHeadRowComponent,
	TableBodyComponent,
	TableBodyCellComponent,
	TableBodyGroupComponent,
	TableBodyRowComponent,
	TableBodyRowDetailsComponent
} from './components';

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

import {
	GroupPipe,
	CellFormatPipe,
	ObjectFormatPipe
} from './pipes';

import {
	ArrayService,
	FilterService,
	ImgService,
	ObjectService,
	PagerService,
	FormatService,
	SortService,
} from './services';


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