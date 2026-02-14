//italian.ts
import { Component } from '@angular/core';
import { GenericEditor } from '../A-GENERIC-EDITOR/generic-editor';
import { LanguageEditorBase } from '../../models/language-editor-base';
import { WordList } from '../../word-list/word-list';

@Component({
  selector: 'app-italian',
  imports: [GenericEditor, WordList],
  templateUrl: './italian.html',
  styleUrl: './italian.css'
})
export class Italian extends LanguageEditorBase{

}
