import { createDatabasePool } from "../src/server/db"
import { v4 as uuidv4 } from "uuid"

const DICTIONARY = {
    en: [
        "me",
        "new",
        "old",
        "forever",
        "time",
        "path",
        "think",
        "believe",
        "undermine",
        "stubborn",
        "indicate",
        "imply",
        "lose",
        "win",
        "I",
        "way",
        "you",
        "he",
        "celebrate",
        "she",
        "join",
        "love",
        "why",
        "we",
        "us",
        "boss",
        "they",
        "thus",
        "hangman",
        "improve",
        "client",
        "call",
        "city",
        "welcome",
        "leave",
        "sit",
        "country",
        "house",
        "land",
        "river",
        "severe",
        "sea",
        "surprise",
        "zip",
        "fast",
        "natives",
        "speedup",
        "date",
        "run",
        "abort",
        "see",
        "employee",
        "scenario",
        "absolutely",
        "change",
        "effect",
        "bone",
        "leg",
        "grow",
        "stand",
        "place",
        "body",
        "eye",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
        "ten",
    ],
    de: [
        "ich",
        "du",
        "er",
        "sie",
        "es",
        "verlieren",
        "gewinnen",
        "Spiel",
        "Galgenmännchen",
        "daher",
        "Haus",
        "Mal",
        "sobald",
        "immer",
        "Bein",
        "oft",
        "stur",
        "Auge",
        "Hintergrund",
        "Körper",
        "überhaupt",
        "selten",
        "Überraschung",
        "Brot",
        "jedenfalls",
        "unbedingt",
        "sogar",
        "durchaus",
        "soeben",
        "laufen",
        "Bürgermeister",
        "Stadt",
        "Land",
        "Fluss",
        "stets",
        "See",
        "Meer",
        "eins",
        "zwei",
        "drei",
        "vier",
        "fünf",
        "sechs",
        "sieben",
        "acht",
        "neun",
        "zehn",
    ],
}

async function loadData() {
    const pool = createDatabasePool()
    const client = await pool.connect()

    if (!client) {
        return
    }
    try {
        DICTIONARY.en.forEach((word) => {
            client.query(
                `
            INSERT INTO app_public.words_en(uuid, word, frequency)
            VALUES($1, $2, $3)
        `,
                [uuidv4(), word, 1]
            )
        })
        DICTIONARY.de.forEach((word) => {
            client.query(
                `
            INSERT INTO app_public.words_de(uuid, word, frequency)
            VALUES($1, $2, $3)
        `,
                [uuidv4(), word, 1]
            )
        })
    } catch (e) {}
}

loadData()
