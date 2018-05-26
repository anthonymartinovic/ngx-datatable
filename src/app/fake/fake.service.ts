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
						'Authorization': 'Bearer df6e6c5b9bee4ac9b2809912c0a10f2cf4a16498f107fac60b823a615d4b8bef1f4b0a589684a62d3150637c6927b60a4XAtloEVjM2b3dcs6M/iHd3VVZrNBTN5baRSSoDlD4A='
					}
				}
			);
	}
}
