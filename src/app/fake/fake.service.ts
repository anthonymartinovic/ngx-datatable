import { Injectable } from '@angular/core';
import { Project, Person } from './model';
import { PROJECTS, PERSONNEL } from './data';

@Injectable()
export class ProjectService {

	getProjects(): Project[] {
		return PROJECTS;
	}
	getPersonnel(): Person[] {
		return PERSONNEL;
	}

}
