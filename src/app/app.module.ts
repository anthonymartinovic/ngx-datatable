import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { NgxDatatableModule } from '../../projects/ngx-datatable/src/lib/ngx-datatable.module';

import { FakeService } from './fake/fake.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		HttpClientModule,
		NgxDatatableModule
	],
	providers: [FakeService],
	bootstrap: [AppComponent],
})
export class AppModule {}
