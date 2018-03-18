import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { FlexiTableComponent } from './ngx-flexi-table.component';

import { CellStyleDirective } from './directives/cell.style.directive';
import { PagerStyleDirective } from './directives/pager.style.directive';

import { CellFormatPipe } from './pipes/cell.format.pipe';

import { ImgService } from './services/img.service';
import { PagerService } from './services/pager.service';
import { SortService } from './services/sort.service';
import { TableComponent } from './components/table/table.component';
import { PagerComponent } from './components/pager/pager.component';

@NgModule({
	imports: [CommonModule],
	declarations: [
		FlexiTableComponent, 
		CellFormatPipe, 
		CellStyleDirective, 
		PagerStyleDirective, 
		TableComponent, 
		PagerComponent
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
