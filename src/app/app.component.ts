import { Component, OnInit } from '@angular/core';
import { Project, Person } from './fake/model';
import { FakeService } from './fake/fake.service';
import { ColumnConfig } from './modules/flexi-table/models/column.config.model';

@Component({
	selector: 'app-root',
	template: `<app-flexi-table
					[records]="projects"
					[caption]="'NASA Projects'"
					[config]="projectConfig">
				</app-flexi-table>
				<app-flexi-table
					[records]="people"
					[caption]="'NASA Astronauts'"
					[config]="personnelConfig">
				</app-flexi-table>`,
})

export class AppComponent implements OnInit {
	title: string = 'Project Center';
	projects: Project[];
	people: Person[];
	projectConfig: ColumnConfig[] = [
		{
			primaryKey: 'name',
			header: 'Name',
		},
		{
			primaryKey: 'first_launch',
			header: 'First launch',
			alternativeKeys: ['launch', 'first_flight']
		},
		{
			primaryKey: 'cost',
			header: 'Cost',
			format: 'currency',
			alternativeKeys: ['total_cost']
		},
	];

	personnelConfig: ColumnConfig[] = 
       [
            {  primaryKey: 'name' },
            {  primaryKey: 'year_joined', header: 'Joined' },
            {  primaryKey: 'missions' },
            {  primaryKey: 'manager'  },
            {  primaryKey: 'crewWith', header: 'Crew mates'}
        ];

	constructor(private fakeService: FakeService) {}

	ngOnInit() {
		this.projects = this.fakeService.getProjects();
		this.people = this.fakeService.getPersonnel();
		console.log(this.projects);
		console.log(this.people);
	}
}
