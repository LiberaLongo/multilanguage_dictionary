// language-editor-base.ts
import { Word } from './word.model';
import { DexieWordRepository } from '../services/DexieWordRepository';

export abstract class LanguageEditorBase {
	repository = new DexieWordRepository();

	words: Word[] = [];

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
