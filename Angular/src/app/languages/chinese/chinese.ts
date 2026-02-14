// Angular/src/app/chinese/chinese.ts

import { Component } from '@angular/core';
import { GenericEditor } from '../A-GENERIC-EDITOR/generic-editor';
import { LanguageEditorBase } from '../../models/language-editor-base';
import { WordList } from '../../word-list/word-list';

@Component({
	standalone: true,
	selector: 'app-chinese',
	imports: [GenericEditor, WordList],
	templateUrl: './chinese.html',
	styleUrl: './chinese.css'
})
export class Chinese extends LanguageEditorBase{
}
