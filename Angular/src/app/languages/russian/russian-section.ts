import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RussianWord } from '../../models/word.model';

@Component({
	selector: 'russian-section',
	standalone: true,
	imports: [CommonModule, FormsModule],
	template: `
		<h3>Russian
			<img src="Russian.png" alt="Russian flag" height="50px">
		</h3>

		<label>
			Insert Russian word:
			<input type="text" [(ngModel)]="native" name="native" required>
		</label>
		<br>
		<label>
			Transliteration (optional):
			<input type="text" [(ngModel)]="transliteration" name="transliteration">
		</label>
		<br>
		<label>
			Pronunciation (optional):
			<input type="text" [(ngModel)]="pronunciation" name="pronunciation">
		</label>
		<br>
	`
})
export class RussianSection {

	@Input() data?: RussianWord;
	@Output() dataChange = new EventEmitter<RussianWord>();

	native = '';
	transliteration = '';
	pronunciation = ''

	ngOnChanges() {
		if (this.data) {
			this.native = this.data.native ?? '';
			this.transliteration = this.data.transliteration ?? '';
			this.pronunciation = this.data.pronunciation ?? '';
		}
	}

	private emitChange() {
		this.dataChange.emit({
			native: this.native,
			transliteration: this.transliteration || undefined,
			pronunciation: this.pronunciation || undefined
		});
	}
}
