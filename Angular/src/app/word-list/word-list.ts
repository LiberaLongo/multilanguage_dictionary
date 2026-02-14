import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Word } from '../models/word.model';
import { DexieWordRepository } from '../services/DexieWordRepository';

@Component({
	selector: 'app-word-list',
	imports: [CommonModule],
	templateUrl: './word-list.html',
	styleUrl: './word-list.css'
})
export class WordList {
	@Input() language?: string;

	words: Word[] = [];

	constructor(private repository: DexieWordRepository) {}

	async ngOnInit() {
		if (this.language) {
			this.words = await this.repository.getByLanguage(this.language);
		} else {
			this.words = await this.repository.getAll();
		}
	}
}
