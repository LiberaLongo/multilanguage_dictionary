//russian.ts
import { Component } from '@angular/core';
import { GenericEditor } from '../A-GENERIC-EDITOR/generic-editor';
import { LanguageEditorBase } from '../../models/language-editor-base';
import { WordList } from '../../word-list/word-list';

@Component({
  selector: 'app-russian',
  imports: [GenericEditor, WordList],
  templateUrl: './russian.html',
  styleUrl: './russian.css'
})
export class Russian extends LanguageEditorBase{

}
