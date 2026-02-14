//french.ts
import { Component } from '@angular/core';
import { GenericEditor } from '../A-GENERIC-EDITOR/generic-editor';
import { LanguageEditorBase } from '../../models/language-editor-base';
import { WordList } from '../../word-list/word-list';

@Component({
  selector: 'app-french',
  imports: [GenericEditor, WordList],
  templateUrl: './french.html',
  styleUrl: './french.css'
})
export class French extends LanguageEditorBase{

}
