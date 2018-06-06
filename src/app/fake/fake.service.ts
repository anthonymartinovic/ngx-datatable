import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Person, Project } from './model';

import { PERSONNEL, PROJECTS } from './records';

@Injectable()
export class FakeService {

	constructor(private http: HttpClient) {}

	getProjects(): Project[] {
		return PROJECTS;
	}

	getPersonnel(): Person[] {
		return PERSONNEL;
	}

	getAppraisals(searchParam?, pageNumber?, filterParam?, sortParam?): Observable<any> {

		let search = searchParam || ''
		
		let page = pageNumber || 1

		let filter = filterParam || 'updated_at'

		let sort = sortParam || 'descending'
		
		return this.http.get(
				`http://localhost:3333/appraisals?search=${search}&page=${page}&filter=${filter}&sort=${sort}`,
				{ 
					headers: {
						'Authorization': 'Bearer 508ff655951032e4f6c4ed4883b51f9e82738a01ffdcca681c0c17e23425febd3243ad5fa6ec5679347aab3c2d45f85bXjr+bV2biBIWDTNNXxCeY4nMmL/SR8kGWBjBjb3zXTY='
					}
				}
			);
	}
}
