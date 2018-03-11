import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { FlexiTableComponent } from './flexi-table.component';

import { CellStyleDirective } from './directives/cell.style.directive';
import { PagerStyleDirective } from './directives/pager.style.directive';

import { CellFormatPipe } from './pipes/cell.format.pipe';

import { ImgService } from './services/img.service';
import { PagerService } from './services/pager.service';
import { SortPipe } from './pipes/sort.pipe';

@NgModule({
	imports: [CommonModule],
	declarations: [
		FlexiTableComponent, 
		CellFormatPipe, 
		CellStyleDirective, 
		PagerStyleDirective, 
		SortPipe
	],
	providers: [
		CurrencyPipe,
		ImgService,
		PagerService
	],
	exports: [FlexiTableComponent],
})

export class FlexiTableModule {}
