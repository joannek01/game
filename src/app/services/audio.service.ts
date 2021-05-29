import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor() { }
  private _isBGMPlaying: boolean = false;

  playBackgroundMusic(){
    if (this._isBGMPlaying) return;
    this._isBGMPlaying = true;
    let audio = new Audio();
    audio.src = "../../assets/audio/Joanne.wav";
    audio.load();
    audio.play();
    audio.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
    }, false);

  }

  success() {
    let audio  = new Audio();
    audio.src = "../../assets/audio/success.wav";
    audio.load();
    audio.play();
  }

  fail() {
    let audio = new Audio();
    audio.src = "../../assets/audio/fail.wav";
    audio.load();
    audio.play();
  }

  score() {
    let audio = new Audio();
    audio.src = "../../assets/audio/score.wav";
    audio.load();
    audio.play();
  }
}
