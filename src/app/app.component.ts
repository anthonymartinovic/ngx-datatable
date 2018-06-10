import { Component, OnInit } from '@angular/core';

import { Project, Person } from './fake/model';
import { DT_ColumnConfig, DT_Init, DT_ServerPageData, DT_Styles } from '../../projects/ngx-datatable/src/lib/models';

import { FakeService } from './fake/fake.service';

@Component({
	selector: 'ngx-root',
	template: `
		<ngx-datatable
			[init]="tableInit"
			[config]="projectConfig"
			[forceLoader]="loading"
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
		></ngx-datatable>
	`
})
export class AppComponent implements OnInit {
	loading: boolean = false;

	people: any[];
	personnelConfig: DT_ColumnConfig[] = [
		{  primeKey: 'name' },
		{  primeKey: 'year_joined', header: 'Joined' },
		{  primeKey: 'missions' },
		{  primeKey: 'manager'  },
		{  primeKey: 'crewWith', header: 'Crew mates'},
	];

	projects: any[];
	projectConfig: DT_ColumnConfig[] = [
		{
			primeKey: 'name',
			header: 'Name',
		}
	];

	tableInit: DT_Init = new DT_Init({
		loader: true,
		server: true,
		header: false,
		rowDetail: true,
		checkboxes: true,
		groupBy: ['team.officeName'],
		filter: { show: true, type: 'columns', keys: ['Address'] },
		newTab: { show: true, caption: '', keys: ['_id'] }
	});

	pageLimit: number = 10;

	pageData: DT_ServerPageData;

	filterColumn: string = 'name';
	columnFilters: string[] = [];

	styles: DT_Styles = new DT_Styles({
		template: {
			use: true,
			layout: 'flex',
			theme: 'basic'
		},
		header: {
			height: '0px'
		},
		content: {
			headHeight: '40px',
			groupRowHeight: '30px',
			rowHeight: '30px'
		},
		footer: {
			height: '50px'
		}
	})

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
		console.log(this.tableInit);
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
		this.getAppraisals(event, null, null, null);
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
