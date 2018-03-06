import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-flexi-table',
	template: `<div>
					<h4>Ngx Flexi Table</h4>
					<table>
						<thead>
							<tr>
								<th>Column 1</th>
								<th>Column 2</th>
								<th>Column 2</th>
								<th>Column 2</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Some value</td>
								<td>Some value</td>
								<td>Some value</td>
								<td>Some value</td>
							</tr>
							<tr>
								<td>Some value</td>
								<td>Some value</td>
								<td>Some value</td>
								<td>Some value</td>
							</tr>
							<tr>
								<td>Some value</td>
								<td>Some value</td>
								<td>Some value</td>
								<td>Some value</td>
							</tr>
						</tbody>
					</table>
				</div>`,
	styleUrls: ['./flexi-table.component.scss'],
	host: {
		class: 'ngx-flexi-table',
	},
})
export class FlexiTableComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
}
