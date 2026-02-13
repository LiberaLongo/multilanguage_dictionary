import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JapaneseWord } from '../../models/word.model';

@Component({
	selector: 'japanese-section',
	standalone: true,
	imports: [CommonModule, FormsModule],
	template: `
		<h3>Japanese
			<img src="Japanese.png" alt="Japanese flag" height="50px">
		</h3>

		<label>
			Insert Japanese word:
			<input type="text" [(ngModel)]="native" name="native" required>
		</label>
		<br>
		<label>
			Hiragana:
			<input type="text" [(ngModel)]="hiragana" name="hiragana">
		</label>
		<br>
		<label>
			Katakana (optional):
			<input type="text" [(ngModel)]="katakana" name="katakana">
		</label>
		<br>
		<label>
			Romaji (ASCII-only):
			<input type="text" [(ngModel)]="romaji" name="romaji">
		</label>
		<br>
	`
})
export class JapaneseSection {

	@Input() data?: JapaneseWord;
	@Output() dataChange = new EventEmitter<JapaneseWord>();

	native = '';
	romaji = '';
	hiragana = '';
	katakana = '';

	ngOnChanges() {
		if (this.data) {
			this.native = this.data.native ?? '';
			this.romaji = this.data.romaji ?? '';
			this.hiragana = this.data.hiragana ?? '';
			this.katakana = this.data.katakana ?? '';
		}
	}

	private emitChange() {
		this.dataChange.emit({
			native: this.native,
			romaji: this.romaji || undefined,
			hiragana: this.hiragana || undefined,
			katakana: this.katakana || undefined,
		});
	}
}
