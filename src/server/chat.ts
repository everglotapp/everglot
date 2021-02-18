import type { Server } from "http"
import socketio from "socket.io"
import { formatMessage } from "./messages"
import { userJoin, getCurrentUser, userLeave, getRoomUsers } from "./users"
import { ALPHABET } from "../constants"

const botName = "Everglot Bot"

type HangmanLanguage = "English" | "German"
class HangmanGame {
    running: boolean = false
    language: HangmanLanguage
    picked: string[] = []
    available: string[] = []
    word: string = "Test"

    constructor(language: HangmanLanguage) {
        this.language = language
        this.available = ALPHABET[language].filter(
            (l: string) => l === l.toLowerCase()
        )
    }

    start(): void {
        this.running = true
    }

    letterPicked(l: string): boolean {
        return this.picked.includes(l.toLowerCase())
    }

    letterAvailable(l: string): boolean {
        return this.available.includes(l.toLowerCase())
    }

    pickLetter(l: string): void {
        this.picked.push(l.toLowerCase())
        this.available = this.available.filter(
            (av: string) => l.toLowerCase() !== av
        )
    }

    get over(): boolean {
        for (let i = 0; i < this.word.length; ++i) {
            if (!this.picked.includes(this.word[i].toLowerCase())) {
                return false
            }
        }
        return true
    }

    nextRound(): boolean {
        if (!this.over) {
            return false
        }
        this.reset("newword")
        return true
    }

    reset(newWord: string): void {
        this.word = newWord
        this.picked = []
        this.available = ALPHABET[this.language].filter(
            (l: string) => l === l.toLowerCase()
        )
    }

    get publicWord(): string {
        let result = ""
        for (let i = 0; i < this.word.length; ++i) {
            result += this.picked.includes(this.word[i].toLowerCase())
                ? this.word[i]
                : "_ "
        }
        return result
    }
}
let hangmanGames: Record<HangmanLanguage, HangmanGame> = {
    English: new HangmanGame("English"),
    German: new HangmanGame("German"),
}

export function start(server: Server) {
    const io = socketio(server)
    // Run when client connects
    io.on("connection", (socket: socketio.Socket) => {
        socket.on("joinRoom", ({ username, room }) => {
            const user = userJoin(socket.id, username, room)

            socket.join(user.room)

            // Welcome current user
            socket.emit(
                "message",
                formatMessage(botName, `Welcome to Everglot, ${username}!`)
            )

            // Broadcast when a user connects
            socket.broadcast
                .to(user.room)
                .emit(
                    "message",
                    formatMessage(
                        botName,
                        `${user.username} has joined the chat`
                    )
                )

            // Send users and room info
            io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: getRoomUsers(user.room),
            })
        })

        // Listen for chatMessage
        socket.on("leaveRoom", () => {
            userLeave(socket.id)
        })

        // Listen for chatMessage
        socket.on("chatMessage", (msg) => {
            const user = getCurrentUser(socket.id)
            if (!user) {
                return
            }

            if (msg) {
                io.to(user.room).emit(
                    "message",
                    formatMessage(user.username, msg)
                )
                if (["English", "German"].includes(user.room)) {
                    const hangman = hangmanGames[user.room as HangmanLanguage]
                    if (hangman.running) {
                        if (msg.length === 1) {
                            if (!hangman.letterPicked(msg)) {
                                if (hangman.letterAvailable(msg)) {
                                    hangman.pickLetter(msg)
                                    sendBotMessage(
                                        `Current word: ${hangman.publicWord}`,
                                        user.room
                                    )
                                    if (hangman.nextRound()) {
                                        sendBotMessage(
                                            `New word: ${hangman.publicWord}`,
                                            user.room
                                        )
                                    }
                                }
                            }
                        }
                        if (
                            ALPHABET[user.room as HangmanLanguage].includes(msg)
                        ) {
                        }
                    }
                    if (msg.startsWith("!hangman")) {
                        if (hangman.running) {
                            sendBotMessage(
                                "Hangman is already running.",
                                user.room
                            )
                        } else {
                            hangman.start()
                            sendBotMessage(
                                `Started a hangman game: ${hangman.publicWord}`,
                                user.room
                            )
                        }
                    }
                } else {
                    if (msg.startsWith("!hangman")) {
                        sendBotMessage(
                            "So far, hangman is only supported in English and German.",
                            user.room
                        )
                    }
                }
            }
        })

        // Runs when client disconnects
        socket.on("disconnect", () => {
            const user = userLeave(socket.id)

            if (user) {
                io.to(user.room).emit(
                    "message",
                    formatMessage(botName, `${user.username} has left the chat`)
                )

                // Send users and room info
                io.to(user.room).emit("roomUsers", {
                    room: user.room,
                    users: getRoomUsers(user.room),
                })
            }
        })

        function sendBotMessage(msg: string, room: string, delay = 300) {
            setTimeout(() => {
                io.to(room).emit("message", formatMessage(botName, msg))
            }, delay)
        }
    })
}

export default {
    start,
}
