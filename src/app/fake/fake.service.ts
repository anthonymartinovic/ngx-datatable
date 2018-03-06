import { Injectable } from '@angular/core';

import { PERSONNEL, PROJECTS } from './data';
import { Person, Project } from './model';
@Injectable()
export class FakeService {
	getProjects(): Project[] {
		return PROJECTS;
	}

	getPersonnel(): Person[] {
		return PERSONNEL;
	}
}
