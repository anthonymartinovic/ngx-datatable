import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ImgService } from '../../services/img.service';

@Component({
	selector: 'ngx-filter',
	host: { class: 'filter' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="search-container">
			<div class="search-icon" [innerHTML]="imgService.getSVG('search')"></div>
			<input
				type='text'
				placeholder='Search...'
				class="search-input"
				(keyup)='setFilter($event)'
			/>
		</div>
	`,
})
export class FilterComponent implements OnInit {

	constructor(public imgService: ImgService) {}

	ngOnInit() {}

	setFilter(filter: string): void {

	}
}
