// Angular/src/app/chinese/chinese.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericEditor } from '../A-GENERIC-EDITOR/generic-editor';
import { Word } from '../../models/word.model';
import { DexieWordRepository } from '../../services/DexieWordRepository';

@Component({
	standalone: true,
	selector: 'app-chinese',
	imports: [CommonModule, GenericEditor],
	templateUrl: './chinese.html',
	styleUrl: './chinese.css'
})
export class Chinese {
	repository = new DexieWordRepository();
  
	// this will hold submitted words for testing / display
	words: Word[] = [];
  
	// called when GenericEditor emits a wordCreated event
	async addWord(word: Word) {
		try {
			await this.repository.add(word);
			this.words = [...this.words, word];
			console.log('Word added:', word);
		} catch (err) {
			console.error('ADD FAILED:', err);
		}
	}
}
