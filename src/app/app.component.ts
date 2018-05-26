import { Component, OnInit } from '@angular/core';

import { Project, Person } from './fake/model';
import { ColumnConfig } from './packages/flexi-table/models/column.model';
import { TableInit } from './packages/flexi-table/models/table-init.model';

import { FakeService } from './fake/fake.service';

//ALL OPTIONS:
// <ngx-flexi-table
// 	[config]="projectConfig"
// 	[styles]="styles"
// 	[records]="projects"
// 	[pageLimit]="pageLimit"
// 	[groupBy]="['name']"
// 	[globalFilter]="filterColumn"
// 	[columnFilters]="columnFilters"
//  [init]="tableInit"
//	[pageData]="pageData"
// 	(onRowSelection)="logRow($event)"
// 	(onCheckboxChange)="logRows($event)"
// 	(onNewTabSelection)="logRoute($event)"
// ></ngx-flexi-table>

//NOTES:
//	- Config is required to use filters
//	- columnFilters overrides globalFilter
//	- if newTab is true, newTabKeys are required
//	- pageData ignored if serverSide is false
//	- pageLimit ignored if serverSide is true

@Component({
	selector: 'ngx-root',
	template: `
		<ngx-flexi-table
			*ngIf="!loading"
			[init]="tableInit"
			[config]="projectConfig"
			[records]="projects"
			[columnFilters]="columnFilters"
			(onRowSelection)="logRow($event)"
			(onCheckboxChange)="logRows($event)"
			(onNewTabSelection)="logRoute($event)"
		></ngx-flexi-table>
	`
})
export class AppComponent implements OnInit {
	loading: boolean = false;

	people: any[];
	personnelConfig: ColumnConfig[] = [
		{  primeKey: 'name' },
		{  primeKey: 'year_joined', header: 'Joined' },
		{  primeKey: 'missions' },
		{  primeKey: 'manager'  },
		{  primeKey: 'crewWith', header: 'Crew mates'},
	];

	projects: any[];
	projectConfig: ColumnConfig[] = [
		{
			primeKey: 'name',
			header: 'Name',
		}
	];

	tableInit: TableInit = {
		serverSide: false,
		header: true,
		footer: true,
		caption: 'New Table Title',
		exportOptions: false,
		selectable: false,
		checkboxes: false,
		rowDetail: false,
		newTab: {
			show: false,
			caption: 'New Route Title',
			keys: ['first_flight']
		},
	};

	pageLimit: number = 10;

	pageData: {
		currentPage: number,
		limit: number,
		total: number
	}

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

	// ngOnInit() {
	// 	this.projects = this._fakeService.getProjects();
	// 	this.people = this._fakeService.getPersonnel();
	// 	this.projects = [
	// 		{
	// 			id: 1,
	// 			name: 'Mercury',
	// 			cost: 277000000,
	// 			first_flight: 'September 9, 1959',
	// 			status: 'Complete',
	// 		},
	// 		{
	// 			id: 2,
	// 			name: 'Gemini',
	// 			cost: 1300000000,
	// 			first_flight: 'April 8, 1964',
	// 			status: 'Complete',
	// 		},
	// 		{
	// 			id: 1,
	// 			name: 'Mercury',
	// 			cost: 277000000,
	// 			first_flight: 'September 9, 1959',
	// 			status: 'Complete',
	// 		},
	// 		{
	// 			id: 2,
	// 			name: 'Gemini',
	// 			cost: 1300000000,
	// 			first_flight: 'April 8, 1964',
	// 			status: 'Complete',
	// 		},
	// 		{
	// 			id: 1,
	// 			name: 'Mercury',
	// 			cost: 277000000,
	// 			first_flight: 'September 9, 1959',
	// 			status: 'Complete',
	// 		},
	// 		{
	// 			id: 2,
	// 			name: 'Gemini',
	// 			cost: 1300000000,
	// 			first_flight: 'April 8, 1964',
	// 			status: 'Complete',
	// 		},
	// 		{
	// 			id: 1,
	// 			name: 'Mercury',
	// 			cost: 277000000,
	// 			first_flight: 'September 9, 1959',
	// 			status: 'Complete',
	// 		},
	// 		{
	// 			id: 2,
	// 			name: 'Gemini',
	// 			cost: 1300000000,
	// 			first_flight: 'April 8, 1964',
	// 			status: 'Complete',
	// 		},
	// 		{
	// 			id: 1,
	// 			name: 'Mercury',
	// 			cost: 277000000,
	// 			first_flight: 'September 9, 1959',
	// 			status: 'Complete',
	// 		},
	// 		{
	// 			id: 2,
	// 			name: 'Gemini',
	// 			cost: 1300000000,
	// 			first_flight: 'April 8, 1964',
	// 			status: 'Complete',
	// 		},
	// 		{
	// 			id: 1,
	// 			name: 'Mercury',
	// 			cost: 277000000,
	// 			first_flight: 'September 9, 1959',
	// 			status: 'Complete',
	// 		},
	// 		{
	// 			id: 2,
	// 			name: 'Gemini',
	// 			cost: 1300000000,
	// 			first_flight: 'April 8, 1964',
	// 			status: 'Complete',
	// 		},
	// 		{
	// 			id: 1,
	// 			name: 'Mercury',
	// 			cost: 277000000,
	// 			first_flight: 'September 9, 1959',
	// 			status: 'Complete',
	// 		},
	// 		{
	// 			id: 2,
	// 			name: 'Gemini',
	// 			cost: 1300000000,
	// 			first_flight: 'April 8, 1964',
	// 			status: 'Complete',
	// 		},
	// 	];
	// 	setTimeout(() => {
	// 		this.projectConfig = [
	// 			{
	// 				primeKey: 'first_launch',
	// 				altKeys: ['launch', 'first_flight'],
	// 				header: 'First launch',
	// 			},
	// 			{
	// 				primeKey: 'cost',
	// 				altKeys: ['total_cost'],
	// 				header: 'Cost',
	// 				format: 'currency',
	// 			},
	// 		];
	// 		this.projects = this._fakeService.getProjects();
	// 		this.pageLimit = 10;
	// 		this.filterColumn = undefined;
	// 		this.columnFilters = ['first launch'];
	// 	}, 5000);
	// }

	ngOnInit() {
		this.loading = true;
		this.getAppraisals();
	}

	getAppraisals() {
		this._fakeService.getAppraisals().subscribe(
			res => {
				console.log(res);
				this.projects = res.appraisals;
				this.pageData = {
					currentPage: res.page,
					limit: res.limit,
					total: res.total
				}
				this.projectConfig = [
					{
						primeKey: 'property.displayAddress',
						header: 'Address',
					},
					{
						primeKey: 'team.officeName',
						altKeys: ['team.office'],
						header: 'Office',
					},
				];
				this.filterColumn = undefined;
				this.columnFilters = ['Address'];
			},
			err => console.log(err),
			() => this.loading = false
		)
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

// this.projects = this._fakeService.getProjects();
// 		this.people = this._fakeService.getPersonnel();
// 		this.projects = [
// 			{
// 				id: 1,
// 				name: 'Mercury',
// 				cost: 277000000,
// 				first_flight: 'September 9, 1959',
// 				status: 'Complete',
// 			},
// 			{
// 				id: 2,
// 				name: 'Gemini',
// 				cost: 1300000000,
// 				first_flight: 'April 8, 1964',
// 				status: 'Complete',
// 			},
// 			{
// 				id: 1,
// 				name: 'Mercury',
// 				cost: 277000000,
// 				first_flight: 'September 9, 1959',
// 				status: 'Complete',
// 			},
// 			{
// 				id: 2,
// 				name: 'Gemini',
// 				cost: 1300000000,
// 				first_flight: 'April 8, 1964',
// 				status: 'Complete',
// 			},
// 			{
// 				id: 1,
// 				name: 'Mercury',
// 				cost: 277000000,
// 				first_flight: 'September 9, 1959',
// 				status: 'Complete',
// 			},
// 			{
// 				id: 2,
// 				name: 'Gemini',
// 				cost: 1300000000,
// 				first_flight: 'April 8, 1964',
// 				status: 'Complete',
// 			},
// 			{
// 				id: 1,
// 				name: 'Mercury',
// 				cost: 277000000,
// 				first_flight: 'September 9, 1959',
// 				status: 'Complete',
// 			},
// 			{
// 				id: 2,
// 				name: 'Gemini',
// 				cost: 1300000000,
// 				first_flight: 'April 8, 1964',
// 				status: 'Complete',
// 			},
// 			{
// 				id: 1,
// 				name: 'Mercury',
// 				cost: 277000000,
// 				first_flight: 'September 9, 1959',
// 				status: 'Complete',
// 			},
// 			{
// 				id: 2,
// 				name: 'Gemini',
// 				cost: 1300000000,
// 				first_flight: 'April 8, 1964',
// 				status: 'Complete',
// 			},
// 			{
// 				id: 1,
// 				name: 'Mercury',
// 				cost: 277000000,
// 				first_flight: 'September 9, 1959',
// 				status: 'Complete',
// 			},
// 			{
// 				id: 2,
// 				name: 'Gemini',
// 				cost: 1300000000,
// 				first_flight: 'April 8, 1964',
// 				status: 'Complete',
// 			},
// 			{
// 				id: 1,
// 				name: 'Mercury',
// 				cost: 277000000,
// 				first_flight: 'September 9, 1959',
// 				status: 'Complete',
// 			},
// 			{
// 				id: 2,
// 				name: 'Gemini',
// 				cost: 1300000000,
// 				first_flight: 'April 8, 1964',
// 				status: 'Complete',
// 			},
// 		];
// 		setTimeout(() => {
// 			this.projectConfig = [
// 				{
// 					primeKey: 'first_launch',
// 					altKeys: ['launch', 'first_flight'],
// 					header: 'First launch',
// 				},
// 				{
// 					primeKey: 'cost',
// 					altKeys: ['total_cost'],
// 					header: 'Cost',
// 					format: 'currency',
// 				},
// 			];
// 			this.projects = this._fakeService.getProjects();
// 			this.pageLimit = 10;
// 			this.filterColumn = undefined;
// 			this.columnFilters = ['first launch'];
// 		}, 5000);
