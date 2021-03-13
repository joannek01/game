import { Injectable } from '@angular/core';
import { SpriteService } from './sprite.service';
import Two from '../../assets/two.min.js';

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
}
