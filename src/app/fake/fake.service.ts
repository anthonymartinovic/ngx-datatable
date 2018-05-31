import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

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
						'Authorization': 'Bearer 990e317039ca3bd58c431ddb880e1501506734b1ab1a530f25b1c0ae305370b4c0a1ce92b571ae60f40399715736b9b6pNQOZ8WI2li3BQQEhZu8CCm+Hlar/QlUfIR9vPGt80I='
					}
				}
			);
	}
}
