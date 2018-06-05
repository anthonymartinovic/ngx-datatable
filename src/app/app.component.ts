import { Component, OnInit } from '@angular/core';

import { Project, Person } from './fake/model';
import { ColumnConfig } from './packages/flexi-table/models/column.model';
import { Init } from './packages/flexi-table/models/init.model';
import { ServerPageData } from './packages/flexi-table/models/pager.model';
import { Styles } from './packages/flexi-table/models/styles.model';

import { FakeService } from './fake/fake.service';

@Component({
	selector: 'ngx-root',
	template: `
		<ngx-flexi-table
			*ngIf="!loading"
			[init]="tableInit"
			[config]="projectConfig"
			[records]="projects"
			[pageData]="pageData"
			[styles]="styles"
			(onPageChange)="logPage($event)"
			(onExportAll)="logExportAll($event)"
			(onFilterChange)="logServerFilterChange($event)"
			(onRowSelection)="logRow($event)"
			(onCheckboxChange)="logRows($event)"
			(onNewTabSelection)="logRoute($event)"
			(onSort)="logSort($event)"
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

	tableInit: Init = {
		server: true,
		header: true,
		footer: true,
		caption: 'New Table Title',
		exportOptions: true,
		selectable: true,
		checkboxes: true,
		rowDetail: true,
		pageLimit: 10,
		groupBy: ['team.officeName'],
		filter: {
			show: true,
			type: 'global',
			keys: ['Address', 'Office']
		},
		newTab: {
			show: true,
			caption: 'New Route Title',
			keys: ['_id']
		}
	};

	pageLimit: number = 10;

	pageData: ServerPageData;

	filterColumn: string = 'name';
	columnFilters: string[] = [];

	styles: Styles = {
		template: {
			use: true,
			layout: 'grid',
			theme: 'none'
		},
		header: {
			height: '60px'
		},
		content: {
			headHeight: '40px',
			rowHeight: '30px'
		},
		footer: {
			height: '40px'
		}
	}

	constructor(private _fakeService: FakeService) {}

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

	getAppraisals(searchParam?, pageNumber?, filterParam?, sortParam?) {
		console.log('FETCHING...', searchParam, pageNumber, filterParam, sortParam);
		this._fakeService.getAppraisals(searchParam, pageNumber, filterParam, sortParam).subscribe(
			res => {
				console.log(res);
				this.projects = res.appraisals;
				this.pageData = {
					currentPage: res.page,
					limit: res.limit,
					total: res.total,
					totalPages: Math.ceil(res.total / res.limit)
				}
				this.projectConfig = [
					{
						primeKey: 'property.displayAddress',
						header: 'Address',
					},
					{
						primeKey: 'team.name',
						header: 'Team',
					},
				];
				this.filterColumn = 'name';
				this.columnFilters = ['Address', 'Office'];
			},
			err => console.log(err),
			() => this.loading = false
		)
	}

	logPage(event) {
		console.log('SELECTED-PAGE', event);
		this.getAppraisals(null, event, null, null);
	}

	logExportAll(event) {
		console.log('EXPORT-ALL-DATA', event);
	}

	logServerFilterChange(event) {
		console.log('GLOBAL FILTER', event);
		this.getAppraisals(event[0].value, null, null, null);
	}

	// logColumnFilterChange(event) {
	// 	console.log('COLUMN FILTER', event);
	// }

	logRow(event) {
		console.log('SELECTED-ROW', event);
	}

	logRows(event) {
		console.log('CHECKED-ROWS', event);
	}

	logRoute(event) {
		console.log('ROUTE', event);
	}

	logSort(event) {
		console.log('SORT', event);
		this.getAppraisals(null, null, event.name, event.order);
	}
}
