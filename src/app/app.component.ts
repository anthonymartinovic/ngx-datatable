import { Component, OnInit } from '@angular/core';
import { Project, Person } from './fake/model';
import { FakeService } from './fake/fake.service';

@Component({
	selector: 'app-root',
	template: '<app-flexi-table></app-flexi-table>'
})
export class AppComponent implements OnInit {
	title: string = 'Project Center';
	projects: Project[];
	people: Person[];

	constructor(private fakeService: FakeService) {}

	ngOnInit() {
		this.projects = this.fakeService.getProjects();
		this.people = this.fakeService.getPersonnel();
		console.log(this.projects);
		console.log(this.people);
	}
}
