export class Game {
    public players: string[] = []; // Public ist eigendlich der standart daher nicht nötig
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public pickCardAnimation: boolean = false;  // Neu
    public currentCard: string = '';           // Neu

    constructor() { // ist eine funktion die immer am anfang aufgerufen wird

        this.initializeCards();
     
    }

    public toJson() {
        return {
            players: this.players,
            stack: this.stack,
            playedCards: this.playedCards,
            currentPlayer: this.currentPlayer,
            pickCardAnimation: this.pickCardAnimation,  // Neu
            currentCard: this.currentCard              // Neu
        };
    }


    initializeCards() {
        for (let i = 1; i < 14; i++) {
            this.stack.push('spade_' + i);
            this.stack.push('hearts_' + i);
            this.stack.push('diamonds_' + i);
            this.stack.push('clubs_' + i);
        }
        this.shuffle(this.stack);
    }


    shuffle(array: string[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // ES6 swap
        }
    }






}