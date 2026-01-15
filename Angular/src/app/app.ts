// Angular/src/app/app.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';

const LANGUAGE_LIST = [
	{id: 0, name:"Chinese"},
	{id: 1, name:"English"},
	{id: 2, name:"French"},
	{id: 3, name:"Italian"},
	{id: 4, name:"Japanese"},
	{id: 5, name:"Russian"},
]

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet],
	template: `
		<h1>Hello World</h1>
		@for ( l of languages; track l.id ) {
			<button (click)="navigateToLanguage(l.name)">
				Learn {{l.name}}
				<img [src]="l.name + '.png'" alt="flag of l.name" height="15px"/>
			</button>
		}
		<router-outlet></router-outlet>
	`,
	//styleUrls: ['./app.css']
})
export class AppComponent {

	languages = LANGUAGE_LIST;

	constructor(private router: Router) {}

	navigateToLanguage(name: string) {
		this.router.navigate(['/' + name]);
	}
}
