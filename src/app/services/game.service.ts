import { Injectable } from '@angular/core';
import { SpriteService } from './sprite.service';
import Two from '../../assets/two.min.js';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private _spriteService: SpriteService) { }
  private _coin :any;
  private _score: any;
  private _defaultX: number = 1150;
  private _defaultY: number = 25;
  private _maxY: number = 2480;
  private _maxX: number = 2900;

  private _scoreXOffset = 50;
  private _scoreYOffset = 0;

  private _title: any;
  private _subtitle: any;
  private _increment: number = 0.2;

  private _gameover: any;
  private _gameover2: any;

  private _gameClear: any;
  private _gameClear2: any;

  private _state = new BehaviorSubject<string>('opening');
  public stateObservable = this._state.asObservable();

  private _stage = new BehaviorSubject<number>(0);
  public stageObservable = this._stage.asObservable();

  get state() {
    return this._state.getValue();
  }
  set state(value) {
    this._state.next(value);
  }

  get stage() {
    return this._stage.getValue();
  }
  set stage(value) {
    this._stage.next(value);
  }

  initScore(two: any, numberOfCoins) {
    this._coin = two.makeSprite(this._spriteService.coin.url, this._defaultX, this._defaultY,
      this._spriteService.coin.columns, this._spriteService.coin.rows, this._spriteService.coin.fps);
    this._coin.scale = 1.2;
    this._coin.play(0,0);
    this._score = new Two.Text('X '+numberOfCoins, this._defaultX+this._scoreXOffset, this._defaultY+this._scoreYOffset, 'normal');
    this._score.fill = '#ddddFF';
    this._score.stroke = '#FFFFFF';
    this._score.scale = 1.75;
    two.add(this._score);
  }

  displayScore(x: number, y: number, num: number){
    y = y-230;
    if (y<this._defaultY) y = this._defaultY;
    if (y>this._maxY) y = this._maxY;

    x = x+560;
    if (x<this._defaultX) x = this._defaultX;
    if (x>this._maxX) x = this._maxX;

    this._coin.translation.x=x;
    this._coin.translation.y=y;
    this._score.translation.x = x+this._scoreXOffset;
    this._score.translation.y = y+this._scoreYOffset;
    this._score.value = 'X'+num;
  }
  
  displayTitle(two: any) {
    this._title = new Two.Text('Birb Game', window.scrollX+(window.innerWidth/2), window.scrollY+(window.innerHeight/2)-50, 'normal');
    this._title.fill = 'yellow'; 
    this._title.stroke = 'orange';
    this._title.scale = 11;
    this._title.linewidth = 0.7;
    two.add(this._title);
    this._subtitle = new Two.Text('Click anywhere to begin', window.scrollX+(window.innerWidth/2), window.scrollY+(window.innerHeight/2)+50, 'normal');
    this._subtitle.fill = 'orange';
    this._subtitle.stroke = 'yellow';
    this._subtitle.scale = 5;
    two.add(this._subtitle);
   }

   hideTitle() {
     this._title.scale = 0;
     this._subtitle.scale = 0;
     if (this._gameover) this._gameover.scale = 0
     if (this._gameover2) this._gameover2.scale = 0
     if (this._gameClear) this._gameClear.scale = 0
     if (this._gameClear2) this._gameClear2.scale = 0
     if (this._coin) this._coin.scale = 0
     if (this._score) this._score.scale = 0
    }

   animateTitle(){
     if (this._title.scale>12) {
       this._increment= -0.02;
     }
     else if (this._title.scale<10) {
       this._increment = 0.02;
     }
     this._title.scale = this._title.scale+this._increment;
     this._subtitle.scale = this._subtitle.scale+this._increment;
   }

   displayGameover(two: any) {
    this._gameover = new Two.Text('Game Over!', window.scrollX+(window.innerWidth/2), window.scrollY+(window.innerHeight/2)-50, 'normal');
    this._gameover.fill = 'yellow'; 
    this._gameover.stroke = 'orange';
    this._gameover.scale = 11;
    this._gameover.linewidth = 0.7;
    two.add(this._gameover);
    this._gameover2 = new Two.Text('Click anywhere to restart', window.scrollX+(window.innerWidth/2), window.scrollY+(window.innerHeight/2)+50, 'normal');
    this._gameover2.fill = 'orange';
    this._gameover2.stroke = 'yellow';
    this._gameover2.scale = 5;
    two.add(this._gameover2);
   }

   displayGameClear(two: any, stage: number, maxStage: number) {
    this._gameClear = new Two.Text('Game Clear', window.scrollX+(window.innerWidth/2), window.scrollY+(window.innerHeight/2)-50, 'normal');
    this._gameClear.fill = 'yellow'; 
    this._gameClear.stroke = 'orange';
    this._gameClear.scale = 11;
    this._gameClear.linewidth = 0.7;
    two.add(this._gameClear);
    let textToSay = '';
    if (stage+1<=maxStage) {
      textToSay = 'Click anywhere to advance to stage' +(stage+1);
    }
    else {
      textToSay = 'Click anywhere to restart'
    }

    this._gameClear2 = new Two.Text(textToSay, window.scrollX+(window.innerWidth/2), window.scrollY+(window.innerHeight/2)+50, 'normal');
    this._gameClear2.fill = 'orange';
    this._gameClear2.stroke = 'yellow';
    this._gameClear2.scale = 5;
    two.add(this._gameClear2);
   }
   //switch(variable) {
   // case '0':
   //  console.log('0')
   //  break;
   // case '1':
   //  console.log('1')
   //  break;
   // case '2':
   //  console.log('2')
   //  break;
   // }

  /* Iterations in Javascript
     1. FOR LOOP - will terminate
     2. WHILE LOOP - will not terminate
  
  FOR LOOP EXAMPLES:
  let sum = 0;
    for (let i = 1; i<=100; i++) {
      sum = sum+i;
    }
    console.log(sum);
    
  math.pow(10,2)
    = 100

  let total=0;
  for (let i=0; i<100; i++){
    if (i%2>0){
      total=total+1;
    }
  }
  console.log(total);
  
  let total = 0;
  for (let i=0; i<=100; i++){
    if (i%2 == 0){
      total=total+i;
    }
  }
  console.log(total);
  */
}