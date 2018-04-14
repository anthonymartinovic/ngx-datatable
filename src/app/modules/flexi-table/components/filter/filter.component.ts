import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
	selector: 'ngx-filter',
	host: { class: 'filter' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<input
			type='text'
			placeholder='Type to filter the name column...'
			(keyup)='updateFilter($event)'
  		/>
	`,
})
export class FilterComponent implements OnInit {

	constructor() {}

	ngOnInit() {}

	updateFilter(filter: string): void {

	}
}
