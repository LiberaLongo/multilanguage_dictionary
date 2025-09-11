// Express/models/word.js

const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
	// English as the main key
	english: { type: String, required: true, unique: true },
	synonyms: [String],
	// Translations (alphabetical order)
	chinese: [{
		character: String,
		pinyin: String
	}],
	french: [String],
	german: [String],
	italian: [String],
	japanese: [{
		character: String,
		romaji: String
		//add Kana (hiragana or katakana) later
	}],
	russian: [String]
	// You can add more languages here later
});

/* example
{
	"english": "hello",
	"synonyms": ["hi", "hey", "yo"],
	"chinese": [
		{
			"character": "你好",
			"pinyin": "nihao"
		}
	],
	"french": ["bonjour", "salut"],
	"german": ["hallo"],
	"italian": ["ciao"],
	"japanese": [
		{
			"character": "こんにちは",
			"romaji": "konnichiwa"
		}
	],
	"russian": ["привет"]
}
*/
