import { Component, OnInit } from '@angular/core';

import { Project, Person } from './fake/model';
import { ColumnConfig } from './packages/flexi-table/models/column.model';
import { TableInit } from './packages/flexi-table/models/table-init.model';

import { FakeService } from './fake/fake.service';

// <ngx-flexi-table
// 	[records]="people"
// 	[caption]="'NASA Astronauts'"
// ></ngx-flexi-table>

// <ngx-flexi-table
// 	[config]="projectConfig"
// 	[styles]="styles"
// 	[records]="projects"
// 	[recordsPerPage]="recordsPerPage"
// 	[groupBy]="['name']"
// 	[globalFilter]="filterColumn"
// 	[columnFilters]="columnFilters"
//  [init]="tableInit"
// 	(onRowSelection)="logRow($event)"
// 	(onCheckboxChange)="logRows($event)"
// 	(onNewTabSelection)="logRoute($event)"
// ></ngx-flexi-table>

//NOTES:
//	- Config is required to use filters
//	- columnFilters overrides globalFilter
//	- if newTab is true, newTabKeys are required

@Component({
	selector: 'ngx-root',
	template: `
		<ngx-flexi-table
			[init]="tableInit"
			[config]="projectConfig"
			[records]="projects"
			(onRowSelection)="logRow($event)"
			(onCheckboxChange)="logRows($event)"
			(onNewTabSelection)="logRoute($event)"
		></ngx-flexi-table>
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
		}
	];

	tableInit: TableInit = {
		header: true,
		footer: true,
		caption: 'New Table Title',
		exportOptions: true,
		selectable: true,
		checkboxes: true,
		rowDetail: true,
		newTab: {
			show: true,
			caption: 'New Route Title',
			keys: ['first_flight']
		},
	};

	recordsPerPage: number = 5;

	filterColumn: string = 'name';
	columnFilters: string[] = [];

	styles: any = {
		table: {
			width: '300px'
		},
		head: {
			rowHeight: '60px'
		},
		body: {
			rowHeight: '40px'
		}
	}

	constructor(
		private _fakeService: FakeService
	) {}

	ngOnInit() {
		this.projects = this._fakeService.getProjects();
		this.people = this._fakeService.getPersonnel();
		this.projects = [
			{
				id: 1,
				name: 'Mercury',
				cost: 277000000,
				first_flight: 'September 9, 1959',
				status: 'Complete',
			},
			{
				id: 2,
				name: 'Gemini',
				cost: 1300000000,
				first_flight: 'April 8, 1964',
				status: 'Complete',
			},
			{
				id: 1,
				name: 'Mercury',
				cost: 277000000,
				first_flight: 'September 9, 1959',
				status: 'Complete',
			},
			{
				id: 2,
				name: 'Gemini',
				cost: 1300000000,
				first_flight: 'April 8, 1964',
				status: 'Complete',
			},
			{
				id: 1,
				name: 'Mercury',
				cost: 277000000,
				first_flight: 'September 9, 1959',
				status: 'Complete',
			},
			{
				id: 2,
				name: 'Gemini',
				cost: 1300000000,
				first_flight: 'April 8, 1964',
				status: 'Complete',
			},
			{
				id: 1,
				name: 'Mercury',
				cost: 277000000,
				first_flight: 'September 9, 1959',
				status: 'Complete',
			},
			{
				id: 2,
				name: 'Gemini',
				cost: 1300000000,
				first_flight: 'April 8, 1964',
				status: 'Complete',
			},
			{
				id: 1,
				name: 'Mercury',
				cost: 277000000,
				first_flight: 'September 9, 1959',
				status: 'Complete',
			},
			{
				id: 2,
				name: 'Gemini',
				cost: 1300000000,
				first_flight: 'April 8, 1964',
				status: 'Complete',
			},
			{
				id: 1,
				name: 'Mercury',
				cost: 277000000,
				first_flight: 'September 9, 1959',
				status: 'Complete',
			},
			{
				id: 2,
				name: 'Gemini',
				cost: 1300000000,
				first_flight: 'April 8, 1964',
				status: 'Complete',
			},
			{
				id: 1,
				name: 'Mercury',
				cost: 277000000,
				first_flight: 'September 9, 1959',
				status: 'Complete',
			},
			{
				id: 2,
				name: 'Gemini',
				cost: 1300000000,
				first_flight: 'April 8, 1964',
				status: 'Complete',
			},
		];
		setTimeout(() => {
			this.projectConfig = [
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
			this.projects = this._fakeService.getProjects();
			this.recordsPerPage = 10;
			this.filterColumn = undefined;
			this.columnFilters = ['first launch'];
		}, 5000);
	}

	logRow(event) {
		console.log('SELECTED-ROW', event);
	}

	logRows(event) {
		console.log('CHECKED-ROWS', event);
	}

	logRoute(event) {
		console.log('ROUTE', event)
	}
}
