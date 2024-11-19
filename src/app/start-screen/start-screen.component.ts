import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../firebase-services/game.service';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {

  router = inject(Router);
  private gameService = inject(GameService);

  // game: Game = new Game();
  game = new Game();

  // newGame() {
  //   this.gameService.addGameDoc(this.game.toJson())
  //     .then((gameInfo: string) => {
  //       console.log('Game created with ID: ', gameInfo);
        
  //       this.router.navigateByUrl('/game/' + gameInfo);
  //     });
  // }

  async newGame() {
    try {
      const gameInfo = await this.gameService.addGameDoc(this.game.toJson());
      console.log('Game created with ID: ', gameInfo);
      this.router.navigateByUrl('/game/' + gameInfo);
    } catch (error) {
      console.error('Error creating game:', error);
    }
  }

}
