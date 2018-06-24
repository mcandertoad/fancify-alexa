const fetch = require("node-fetch")

const stopWords = [
    "I",
    "a",
    "about",
    "an",
    "are",
    "as",
    "at",
    "be",
    "by",
    "com",
    "for",
    "from",
    "how",
    "in",
    "is",
    "it",
    "of",
    "on",
    "or",
    "that",
    "the",
    "this",
    "to",
    "was",
    "what",
    "when",
    "where",
    "who",
    "will",
    "with",
    "the",
    "www",
]

const processWord = async (word) => {
    let response = await fetch(`https://wordsapiv1.p.mashape.com/words/${word}/synonyms`, {
        method: "GET",
        headers: {
            "X-Mashape-Key": process.env.MASHAPE_KEY,
            "Accept": "application/json"
        }
    })
    let data = await response.json()

    let syns = data.synonyms;

    return syns.reduce((acc, cur) => {
        if (cur.length > acc.length) return cur;
        return acc;
    }, word)
}

module.exports = (phrase) => {
    let words = phrase.split(" ")

    let promises = [];

    words.forEach(word => {
        if (!stopWords.includes(word))
            promises.push(processWord(word))
        else 
            promises.push(Promise.resolve(word))
    });

    return Promise.all(promises)
        .then(values => values.join(" "))
        .then(resp => {
            console.log(`Response: ${resp}`)
            return resp;
        });
}

