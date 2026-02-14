import { Component } from '@angular/core';
import { GenericEditor } from '../A-GENERIC-EDITOR/generic-editor';
import { LanguageEditorBase } from '../../models/language-editor-base';
import { WordList } from '../../word-list/word-list';

@Component({
  selector: 'app-japanese',
  imports: [GenericEditor, WordList],
  templateUrl: './japanese.html',
  styleUrl: './japanese.css'
})
export class Japanese extends LanguageEditorBase{

}
