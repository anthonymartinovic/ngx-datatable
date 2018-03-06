import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FlexiTableModule } from './modules/flexi-table/flexi-table.module';

import { FakeService } from './fake/fake.service';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule, 
		FlexiTableModule
	],
	providers: [FakeService],
	bootstrap: [AppComponent],
})
export class AppModule {}
