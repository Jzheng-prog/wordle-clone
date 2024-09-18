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
    allGuesses: string[];
    exactGuesses: string[];
    inExactGuesses: string[];

};

const game: Game = {
    word: '', //the word player is guessing ex: 'world'
    guesses: [], // ex: ['ghost', 'house',...]
    currentGuess: 0, //index of the guesses

    get won() {
        
        //if last guess is the word then palyer won
        return this.guesses[this.currentGuess - 1] === this.word;
    },
    get lost() {
        return this.currentGuess === 6 && !this.won;
    },
    init() {
        this.word = words[Math.floor(Math.random() * words.length)];
        this.guesses = new Array(6).fill('');  // Explicitly a string array
        this.currentGuess = 0;
    },
    submitGuess() {
        if (words.includes(this.guesses[this.currentGuess])) {
            console.log(this.currentGuess)
            this.currentGuess += 1;
        }
    },
    handleKeyUp(e: KeyboardEvent) {
        if (this.won || this.lost) {
            return;
        }
        if (e.key === 'Enter') {
            console.log('hit enter')
            return this.submitGuess();
        }
        if (e.key === 'Backspace') {
            this.guesses[this.currentGuess] = this.guesses[this.currentGuess].slice(
                0,
                this.guesses[this.currentGuess].length - 1
            );
            return;
        }
        if (this.guesses[this.currentGuess].length < 5 && e.key.match(/^[A-z]$/)) {
            this.guesses[this.currentGuess] += e.key.toLowerCase();
            console.log(this.guesses)
        }

    },

    get allGuesses(){
        return this.guesses.slice(0, this.currentGuess).join('').split('')
    },
    get exactGuesses(){
        return (
            //world => w,o,r,l,d
            this.word.split('').filter((letter,i)=>{
                //['hello','ghost', 'close',..]
                return this.guesses.slice(0, this.currentGuess).map((word)=> word[i]).includes(letter)
            })
        )
    },
    get inExactGuesses(){
        return this.word.split('').filter((letter)=>this.allGuesses.includes(letter))
    }
};

export default game;
