//english.ts
import { Component } from '@angular/core';
import { GenericEditor } from '../A-GENERIC-EDITOR/generic-editor';
import { LanguageEditorBase } from '../../models/language-editor-base';
import { WordList } from '../../word-list/word-list';

@Component({
  selector: 'app-english',
  imports: [GenericEditor, WordList],
  templateUrl: './english.html',
  styleUrl: './english.css'
})
export class English extends LanguageEditorBase{

}
