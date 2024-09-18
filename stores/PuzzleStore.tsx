import words from '../data/words.json';

type Game = {
    word: string;
    guesses: string[];
    currentGuess: number;
    won: boolean;
    lost: boolean;
    init: () => void;
    submitGuess: () => void;
    handleKeyUp: (e: KeyboardEvent) => void;
};

const game: Game = {
    word: '',
    guesses: [],
    currentGuess: 0,
    get won() {
        return this.guesses[this.currentGuess - 1] === this.word;
    },
    get lost() {
        return this.currentGuess === 6;
    },
    init() {
        this.word = words[Math.floor(Math.random() * words.length)];
        this.guesses = new Array(6).fill('');  // Explicitly a string array
        this.currentGuess = 0;
    },
    submitGuess() {
        if (words.includes(this.guesses[this.currentGuess])) {
            this.currentGuess += 1;
        }
    },
    handleKeyUp(e: KeyboardEvent) {
        if (this.won || this.lost) {
            return;
        }
        if (e.key === 'Enter') {
            return this.submitGuess();
        }
        if (e.key === 'Backspace') {
            this.guesses[this.currentGuess] = this.guesses[this.currentGuess].slice(
                0,
                this.guesses[this.currentGuess].length - 1
            );
            return;
        }
        if (this.guesses[this.currentGuess].length < 5 && e.key.match(/[A-Za-z]/)) {
            this.guesses[this.currentGuess] += e.key.toLowerCase();
        }
    },
};

export default game;
