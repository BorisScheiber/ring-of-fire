import { inject, Injectable } from '@angular/core';
import { 
  Firestore, 
  collection, 
  doc,
  collectionData,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  docData
} from '@angular/fire/firestore';
import { Game } from './../../models/game'; 
import { Observable } from 'rxjs';
import { SingleGameData } from '../interfaces/game.interface';     

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private firestore: Firestore = inject(Firestore);


  constructor() { }


  private getGamesCollection() {
    return collection(this.firestore, 'games');
  }

  private getGameDoc(gameId: string) {
    return doc(this.firestore, 'games', gameId);
  }


  getGames(): Observable<any[]> { // Zusammen any[] heißt: "Ein Array, das beliebige Daten enthalten kann"
    return collectionData(this.getGamesCollection(), { idField: 'id' });
  }

  getSingleGame(gameId: string) {
    return docData(this.getGameDoc(gameId)) as Observable<SingleGameData>;
  }



  async addGameDoc(obj: any) {
    try {
      const docRef = await addDoc(this.getGamesCollection(), obj);
      return docRef.id;  // ✅ Gibt die generierte ID zurück
    } catch (err) {
      console.error("Error adding document: ", err);
      throw err;
    }
}

async updateGameDoc(gameId: string, gameData: any) {
  try {
    await updateDoc(this.getGameDoc(gameId), gameData);
  } catch (err) {
    console.error("Error updating document: ", err);
    throw err;
  };
}

}
