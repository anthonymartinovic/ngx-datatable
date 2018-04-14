import { Component, ChangeDetectionStrategy, OnInit, Input } from '@angular/core';

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
				(keyup)='setFilter($event.target)'
			/>
		</div>
	`,
})
export class FilterComponent implements OnInit {
	@Input() records: {}[];
	@Input() filterColumn: string;

	constructor(public imgService: ImgService) {}

	ngOnInit() {}

	setFilter(target: HTMLInputElement): void {
		const filter = target.value.toLowerCase();

		// this.records = this.records.filter(function(d) {
		//   return d.name.toLowerCase().indexOf(val) !== -1 || !val;
		// });
	}
}
