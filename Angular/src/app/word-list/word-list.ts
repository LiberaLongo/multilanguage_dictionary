import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Word } from '../models/word.model';
import { DexieWordRepository } from '../services/DexieWordRepository';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-word-list',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './word-list.html',
	styleUrls: ['./word-list.css']
})
export class WordList implements OnInit {
	@Input() language?: string;

	words: Word[] = [];
	private sub?: Subscription;

	constructor(private repository: DexieWordRepository) {}

	ngOnInit() {
		this.sub = this.repository.getWords().subscribe(allWords => {
			console.log('WordList subscription received words:', allWords);
			if (this.language) {
				const langKey = (this.language ?? '').toLowerCase() as keyof Word;
				this.words = allWords.filter(w => !!w[langKey]);
				console.log('Filtered words by language:', this.words);
			} else {
				this.words = allWords;
			}
		});
	
		console.log('WordList initializing repository...');
		this.repository.getAll();
	}

	ngOnDestroy() {
		this.sub?.unsubscribe();
	}

	formatKeyAndAllNatives(word: Word): string {
		const parts: string[] = [];
	  
		// always include key if it exists
		if (word.key) {
		  parts.push(word.key);
		}
	  
		// list of languages to check for native
		const languages: (keyof Word)[] = ['chinese', 'italian', 'japanese', 'russian'];
	  
		for (const lang of languages) {
			const langObj = word[lang] as any;
			if (langObj?.native) {
				parts.push(langObj.native);
			}
		}
	  
		return parts.join(' / ');
	}
	  
}
