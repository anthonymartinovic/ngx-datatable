import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ColumnConfig, ColumnMap } from './models/column.config.model';
import { SVG } from './assets/images';
import { ImgService } from './services/img.service';
import { PagerService } from './services/pager.service';
import { SortService } from './services/sort.service';

@Component({
	selector: 'ngx-flexi-table',
	template: `<table>
					<caption *ngIf="caption">{{ caption }}</caption>
					<thead>
						<tr>
							<th *ngFor="let col of columns"
								(click)="setSort(col)"
							>
								{{ col.header }}
							</th>
							<th>{{ routerCaption }}</th>
							<th [flexiCellStyle]="'checkbox'">
								<input 
									type="checkbox" 
									[checked]="isAllChecked()" 
									(change)="updateAll()"
								>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr *ngFor="let record of pagedRecords">
							<td 
								*ngFor="let col of columns"
								[flexiCellStyle]="record[col.access(record)]"
							>
								{{ record[col.access(record)] | formatCell: col.format }}
							</td>
							<td 
								class="flexi-new-tab-container"
								[flexiCellStyle]="'newTab'"
								[innerHTML]="imgService.getSVG('newTab')"
							>
							</td>
							<td [flexiCellStyle]="'checkbox'">
								<input 
									type="checkbox" 
									[checked]="isChecked(record)" 
									(change)="update(record)"
								>
							</td>
						</tr>
					</tbody>
				</table>
				<ul *ngIf="pager.selectablePages && pager.selectablePages.length > 1" class="pagination">
					<li [flexiPagerStyle]="{ button: 'first', currentPage: pager.currentPage }">
						<a (click)="setPage(1)">|<</a>
					</li>
					<li [flexiPagerStyle]="{ button: 'previous', currentPage: pager.currentPage }">
						<a (click)="setPage(pager.currentPage - 1)"><</a>
					</li>
					<li 
						*ngFor="let page of pager.selectablePages"
						[flexiPagerStyle]="{ button: 'number', page: page, currentPage: pager.currentPage }"
					>
						<a (click)="setPage(page)">{{ page }}</a>
					</li>
					<li [flexiPagerStyle]="{ button: 'next', currentPage: pager.currentPage, totalPages: pager.totalPages }">
						<a (click)="setPage(pager.currentPage + 1)">></a>
					</li>
					<li [flexiPagerStyle]="{ button: 'last', currentPage: pager.currentPage, totalPages: pager.totalPages }">
						<a (click)="setPage(pager.totalPages)">>|</a>
					</li>
				</ul>`,
	styleUrls: ['./ngx-flexi-table.component.scss'],
	host: {
		class: 'ngx-flexi-table',
	},
})

export class FlexiTableComponent implements OnInit, OnChanges {
	@Input() caption: string;
	@Input() routerCaption: string;
	@Input() records: any[];
	@Input() recordsPerPage: number;
	@Input() config: ColumnConfig[];

	columns: ColumnMap[];

	checked: any[] = [];
	pager: any = {};
	pagedRecords: any[];
	sortedColumn: {
		name: any,
		order: string
	}

	constructor(
		private _sanitizer: DomSanitizer,
		private _pagerService: PagerService,
		private _sortService: SortService,
		public imgService: ImgService
	) {}

	ngOnInit() {
		this.setPage(1);
	}

	ngOnChanges() {
		if (this.config) 
		{
			this.columns = this.config.map( 
				col => {
					return new ColumnMap(col) 
				}
			);
		} 
		else 
		{
			this.columns = Object.keys(this.records[0]).map(
				key => {
					return new ColumnMap({ primeKey: key });
				}
			);
		}
	}

	isChecked(record): boolean {
		return (this.checked.indexOf(record) > -1)
			? true
			: false;
	}

	isAllChecked(): boolean {
		return (this.checked.length === this.records.length)
			? true
			: false;
	}

	update(record): void {
		let index = this.checked.indexOf(record);
		
		(index > -1)
			? this.checked.splice(index, 1)
			: this.checked.push(record);
	}

	updateAll(): void {
		(this.checked.length != this.records.length)
			? this.checked = this.records.slice()
			: this.checked = [];
	}

	setPage(page: number, bypassGuard: boolean = false): void {

		if (!bypassGuard &&
			(page < 1 || page > this.pager.totalPages || page === this.pager.currentPage))
			return;

		this.pager = this._pagerService.getPager(this.records.length, page, this.recordsPerPage || 10);
 
		this.pagedRecords = this.records.slice(this.pager.startIndex, this.pager.endIndex + 1);
	}

	setSort(column: any) {

		if (this.sortedColumn && this.sortedColumn.name === column.access(this.records[0]))
		{
			(this.sortedColumn.order === 'asc')
				? this.sortedColumn.order = 'desc'
				: this.sortedColumn.order = 'asc';
		}
		else {
			this.sortedColumn = {
				name: column.access(this.records[0]),
				order: 'asc'
			}
		}

		this.records = this._sortService.sortRecords(this.records, this.sortedColumn);

		this.setPage(1, true);
	}
}
