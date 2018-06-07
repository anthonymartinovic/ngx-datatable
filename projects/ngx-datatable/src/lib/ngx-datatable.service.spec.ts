import { TestBed, inject } from '@angular/core/testing';

import { NgxDatatableService } from './ngx-datatable.service';

describe('NgxDatatableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxDatatableService]
    });
  });

  it('should be created', inject([NgxDatatableService], (service: NgxDatatableService) => {
    expect(service).toBeTruthy();
  }));
});
