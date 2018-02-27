import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexiTableComponent } from './flexi-table.component';

@NgModule({
  imports: [CommonModule],
  declarations: [FlexiTableComponent],
  exports: [FlexiTableComponent]
})
export class FlexiTableModule { }
