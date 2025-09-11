// Express/routes/word.js

const express = require("express");
const router = express.Router();
const CRUD = require("../CRUD")
const Word = require("../models/word");

const allowed_Word = ["english", "synonyms", "chinese", "french", "german", "italian", "japanese", "russian"];

function alphabetizeKeys(obj) {
	return Object.keys(obj).sort().reduce((acc, key) => {
		acc[key] = obj[key];
		return acc;
	}, {});
}

function AlphabetizeData(rawData) {
	const clean = CRUD.sanitizeBody(rawData, allowed_Word);

	// simple languages
	const arrayFields = ["synonyms", "french", "german", "italian", "russian"];
	for (const field of arrayFields) {
		if (Array.isArray(clean[field])) {
			clean[field].sort();
		}
	}

	// complex languages
	const objectLangs = [
		{ lang: "chinese", sortKey: "pinyin" },
		{ lang: "japanese", sortKey: "romaji" }
	];
	for (const { lang, sortKey } of objectLangs) {
		if (Array.isArray(clean[lang])) {
			clean[lang].sort((a, b) => {
				if (!a[sortKey]) return -1;
				if (!b[sortKey]) return 1;
				return a[sortKey].localeCompare(b[sortKey]);
			});
		}
	}

	return alphabetizeKeys(clean);
}

// Routes: WORDS
router.post("/", async (req, res) => {
	const sortedData = AlphabetizeData(req.body);
	await CRUD.Create(Word, sortedData, res, "word");
});
//GET: all, wich one has a language, wich language is missing
router.get("/", async (req, res) => {
	const query = {};

	// handle ?has=chinese,japanese,...
	if (req.query.has) {
		const langs = req.query.has.split(",").map(l => l.trim());
		for (const lang of langs) {
			query[lang] = { $exists: true, $ne: [] };
		}
	}

	// handle ?missing=chinese,japanese,...
	if (req.query.missing) {
		const langs = req.query.missing.split(",").map(l => l.trim());
		for (const lang of langs) {
			// If the field is empty array, null, or doesn"t exist
			query[lang] = { $in: [[], null] };
		}
	}

	await CRUD.Read(Word, res, "word", query);
});

/* BY ID */
router.get("/:id", async (req, res) => {
	await CRUD.ReadById(Word, req.params.id, res, "word");
});
router.put("/:id", async (req, res) => {
	const sortedData = AlphabetizeData(req.body);
	await CRUD.Update(Word, req.params.id, sortedData, res, "word");
});
router.delete("/:id", async (req, res) => {
	await CRUD.Delete(Word, req.params.id, res, "word");
});

/* BY ENGLISH */
// READ
router.get("/by-english/:term", async (req, res) => {
	const result = await Word.findOne({ english: req.params.term });

	if (!result) {
		return res.status(404).json({ message: "READ: Word not found" });
	}

	res.status(200).json({ message: "Word found", result });
});
// UPDATE
router.put("/by-english/:term", async (req, res) => {
	const term = req.params.term;
	const sortedData = AlphabetizeData(req.body);

	try {
		const result = await Word.findOneAndUpdate(
			{ english: term },
			{ $set: sortedData },
			{ new: true }
		);

		if (!result) {
			return res.status(404).json({ message: "UPDATE: Word not found" });
		}

		res.status(200).json({ message: "Word updated", result });
	} catch (err) {
		console.error("Error updating word:", err);
		res.status(500).json({ message: "Server error", error: err.message });
	}
});
// DELETE
router.delete("/by-english/:term", async (req, res) => {
	const term = req.params.term;

	try {
		const result = await Word.findOneAndDelete({ english: term });

		if (!result) {
			return res.status(404).json({ message: "DELETE: Word not found" });
		}

		res.status(200).json({ message: "Word deleted", result });
	} catch (err) {
		console.error("Error deleting word:", err);
		res.status(500).json({ message: "Server error", error: err.message });
	}
});


module.exports = router;
