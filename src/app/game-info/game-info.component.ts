import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-game-info',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.scss'
})
export class GameInfoComponent implements OnChanges { // OnChanges ist ein Lifecycle-Hook, muss man nicht importieren
cardAction = [
  { title: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.' },
  { title: 'You', description: 'You decide who drinks' },
  { title: 'Me', description: 'Congrats! Drink a shot!' },
  { title: 'Category', description: 'Come up with a category (e.g. Colors). Each player must enumerate one item from the category.' },
  { title: 'Bust a jive', description: 'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one. ' },
  { title: 'Chicks', description: 'All girls drink.' },
  { title: 'Heaven', description: 'Put your hands up! The last player drinks!' },
  { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
  { title: 'Thumbmaster', description: 'Place your thumb on the table at any time until the next thumbmaster is picked. The last person to notice and place their thumb must drink!' },
  { title: 'Men', description: 'All men drink.' },
  { title: 'Quizmaster', description: 'You are the Quizmaster! Ask a trivia question - everyone who answers wrong must drink. If everyone gets it right, you drink!' },
  { title: 'Never have i ever...', description: 'Say something you nnever did. Everyone who did it has to drink.' },
  { title: 'Rule', description: 'Make a rule. Everyone needs to drink when he breaks the rule.' },
];

title:string = '';
description:string = '';

@Input() card:string = '';

ngOnChanges(): void {
  if (this.card){
  console.log('Current CARD gameINFO.ts = :', this.card);

  let cardNumber = +this.card.split('_')[1];
  console.log('CardNumber =',cardNumber);

  this.title = this.cardAction[cardNumber -1].title;
  console.log('Title =',this.title);
  
  this.description = this.cardAction[cardNumber -1].description;
  console.log('Description =',this.description);
}
  
}

}
