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
						'Authorization': 'Bearer 18520a8f48850e92038e2df68615ab3d73dfd3accd04ffa9dc13eaba251ad5c1c88685c2b974378dddac2f1c182eb380lbmzzL+SGdTSB2Pupxgq9pS8jPhkEzGe9EwE0c2WP5M='
					}
				}
			);
	}
}
