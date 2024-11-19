import { CommonModule, getLocaleFirstDayOfWeek } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MaterialModule } from '../material.module';
import { GameInfoComponent } from '../game-info/game-info.component';
import { GameService } from '../firebase-services/game.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MaterialModule, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit {
  private gameService = inject(GameService);
  private route = inject(ActivatedRoute);


  game!: Game; // "!" sagt TypeScript: "Mach dir keine Sorgen, wird später initialisiert"
  // GING AUCH OHNE "!" DAFÜR IM CONSTRUCTOR INIZIALISIEREN

  gameId: string = '';

  // Constructor wird immer zuerst aufgerufen dann erst ngOnInit
  constructor() {}

  dialog = inject(MatDialog);


  ngOnInit() {
    this.newGame();

    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      console.log('The game ID is:', this.gameId);

      this.gameService.getSingleGame(this.gameId).subscribe((singleGame) => {
        console.log('Single Game:', singleGame);
        if (singleGame) {
          this.game.currentPlayer = singleGame.currentPlayer;
          this.game.playedCards = singleGame.playedCards;
          this.game.players = singleGame.players;
          this.game.stack = singleGame.stack;
          this.game.currentCard = singleGame.currentCard; // Neu
          this.game.pickCardAnimation = singleGame.pickCardAnimation; // Neu
        }
      });
    });
  }


  newGame() {
    this.game = new Game();
    console.log(this.game);
  }


  takeCard() {
    if (this.isAnimating()) {
      return;
    }

    const card = this.game.stack.pop();
    if (card) {
      this.game.currentCard = card;
      // Erst die Grunddaten speichern (Stack, currentCard)
      this.saveGame();

      if (this.game.players.length > 0) {
        this.game.currentPlayer++;
        this.game.currentPlayer =
          this.game.currentPlayer % this.game.players.length;
      }

      // Animation starten
      this.game.pickCardAnimation = true;
      this.saveGame(); // Animation-Status speichern

      // Nach der Animation
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame(); // Finalen Status speichern
      }, 1000);
    }
  }


  isAnimating() {
    return this.game.pickCardAnimation;
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      console.log('The dialog was closed', name);
      if (name && name.length > 0) {
        this.game.players.push(name);
        console.log(this.game.players);
        this.saveGame();
      }
    });
  }


  async saveGame() {
    try {
      await this.gameService.updateGameDoc(this.gameId, this.game.toJson());
    } catch (error) {
      console.error('Error saving game:', error);
    }
  }
}
