import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor() { }

  playBackgroundMusic(){
    let audio = new Audio();
    audio.src = "../../assets/audio/Joanne.wav";
    audio.load();
    audio.play();
  }
}
