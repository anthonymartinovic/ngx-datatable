import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { FlexiTableModule } from './modules/flexi-table/flexi-table.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FlexiTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
