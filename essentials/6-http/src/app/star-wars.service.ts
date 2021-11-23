import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LogService } from './log.service';

@Injectable()
export class StarWarsService {
  private characters = [
    { name: 'John', side: '' },
    { name: 'Joe', side: '' },
  ];
  private logService: LogService;
  charactersChanged = new Subject<void>();

  constructor(logService: LogService) {
    this.logService = logService;
  }

  getCharacters(chosenList: any) {
    if (chosenList === 'all') {
      return this.characters.slice();
    }
    return this.characters.filter((char) => {
      return char.side === chosenList;
    });
  }

  onSideChosen(characterInfo: any) {
    const position = this.characters.findIndex((char) => {
      return char.name === characterInfo.name;
    });

    this.characters[position].side = characterInfo.side;
    this.charactersChanged.next();
    this.logService.writeLog(
      'Changed side of ' +
        characterInfo.name +
        ', new side: ' +
        characterInfo.side
    );
  }

  addCharacter(name: string, side: string) {
    const position = this.characters.findIndex((char) => {
      return char.name === name;
    });

    if (position !== -1) {
      return;
    }

    const newChar = { name: name, side: side };
    this.characters.push(newChar);
  }
}
