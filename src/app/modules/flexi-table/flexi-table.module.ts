import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FlexiTableComponent } from './flexi-table.component';
import { CellFormatPipe } from './pipes/cell.format.pipe';
import { CellStyleDirective } from './directives/cell.style.directive';

@NgModule({
	imports: [CommonModule],
	declarations: [
		FlexiTableComponent, 
		CellFormatPipe, 
		CellStyleDirective
	],
	providers: [CurrencyPipe],
	exports: [FlexiTableComponent],
})

export class FlexiTableModule {}
