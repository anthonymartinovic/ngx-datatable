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
						'Authorization': 'Bearer 0640141201f5104614e07e96f5041adc96a3bdc36b14ff7f42b8a716818a17ed85dfd3219ac8f4b7e23794e22f6e1c24ukKG/cEJi8vlYVW0sPwzxyppp33rhaEyFn7BxkWyAqw='
					}
				}
			);
	}
}
