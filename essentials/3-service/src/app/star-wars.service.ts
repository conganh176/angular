import { Injectable } from '@angular/core';
import { LogService } from "./log.service";

@Injectable()
export class StarWarsService {
  private characters = [
    { name: 'John', side: '' },
    { name: 'Joe', side: '' },
  ];
  private logService: LogService

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
    })

    this.characters[position].side = characterInfo.side;
    this.logService.writeLog("Changed side of " + characterInfo.name + ", new side: " + characterInfo.side);
  }
}


