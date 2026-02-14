// language-editor-base.ts
import { Directive } from '@angular/core';
import { Word } from './word.model';
import { DexieWordRepository } from '../services/DexieWordRepository';

@Directive()
export abstract class LanguageEditorBase {

	words: Word[] = [];

	constructor(private repository: DexieWordRepository) {}

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
