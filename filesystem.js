const fs = require('fs');

const data = {
    chiave: "esempio",
    valore1: "valore1",
    valore2: "valore2"
};

// Scrivere i dati su un file JSON
fs.writeFileSync('data.json', JSON.stringify(data, null, 2), 'utf-8');

// Leggere i dati da un file JSON
const rawData = fs.readFileSync('data.json', 'utf-8');
const parsedData = JSON.parse(rawData);
console.log("Dati letti dal file JSON:", parsedData);

