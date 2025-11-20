// Angular/src/app/chinese/chinese.ts

import { Component } from '@angular/core';
import { GenericEditor } from '../A-GENERIC-EDITOR/generic-editor';

@Component({
	standalone: true,
	selector: 'app-chinese',
	imports: [GenericEditor],
	templateUrl: './chinese.html',
	styleUrl: './chinese.css'
})
export class Chinese {

}
