import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-table-data-cell',
  host: { 'class': 'table-data-cell' },
  template: `
    <p>
      table-data-cell works!
    </p>
  `,
  styles: []
})
export class TableDataCellComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
