import { Component, OnInit } from '@angular/core';

import { Project, Person } from './fake/model';
import { ColumnConfig } from './modules/flexi-table/models/column.model';

import { FakeService } from './fake/fake.service';


@Component({
	selector: 'ngx-root',
	template: `
		<ngx-flexi-table
			[records]="projects"
			[caption]="'NASA Projects'"
			[config]="projectConfig"
			[recordsPerPage]="10">
		</ngx-flexi-table>
		<ngx-flexi-table
			[records]="people"
			[caption]="'NASA Astronauts'">
		</ngx-flexi-table>
	`
})
export class AppComponent implements OnInit {
	people: Person[];
	personnelConfig: ColumnConfig[] = [
		{  primeKey: 'name' },
		{  primeKey: 'year_joined', header: 'Joined' },
		{  primeKey: 'missions' },
		{  primeKey: 'manager'  },
		{  primeKey: 'crewWith', header: 'Crew mates'},
	];

	projects: Project[];
	projectConfig: ColumnConfig[] = [
		{
			primeKey: 'name',
			header: 'Name',
		},
		{
			primeKey: 'first_launch',
			altKeys: ['launch', 'first_flight'],
			header: 'First launch',
		},
		{
			primeKey: 'cost',
			altKeys: ['total_cost'],
			header: 'Cost',
			format: 'currency',
		},
	];

	constructor(
		private _fakeService: FakeService
	) {}

	ngOnInit() {
		this.projects = this._fakeService.getProjects();
		this.people = this._fakeService.getPersonnel();
	}
}
