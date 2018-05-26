import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FlexiTableModule } from './packages/flexi-table/ngx-flexi-table.module';

import { AppComponent } from './app.component';

import { FakeService } from './fake/fake.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		HttpClientModule,
		FlexiTableModule
	],
	providers: [FakeService],
	bootstrap: [AppComponent],
})
export class AppModule {}
