import { Injectable } from '@angular/core';
import { Sprite } from './sprite.service';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  private _changeDirectionChance = .005;
  private _upMovementXChance = 0.5;
  private _upMovementYChance = 0.3;

  constructor() { }

  basicAI(sprite: Sprite) {
    let chance = Math.random();
     if (chance< this._changeDirectionChance) {
       if (sprite.direction =='right') {
        sprite.direction='left';
       }
       else {
         sprite.direction='right';
        }
      }
    chance = Math.random();
      if (chance< this._upMovementXChance) {
        if (sprite.direction =='right') {
          sprite.x = sprite.x+3;
        }
      else {
        sprite.x = sprite.x-3;
        }
      }
    chance = Math.random();
      if (chance< this._upMovementYChance) {
        chance = Math.random();
        if (chance< 0.5) {
        sprite.y = sprite.y+3;
        }
        else {
        sprite.y= sprite.y-3;
        }
      }
    return sprite;
  }

  predatorAI(sprite: Sprite, x: number, y: number, range: number) {
    let distance = Math.pow(sprite.x-x,2) + Math.pow(sprite.y-y,2)
    if (distance<=range) {
      if (sprite.x<=x) {
        sprite.direction = 'right';
        sprite.x = sprite.x+sprite.maxSpeed;
      }
      else {
        sprite.direction = 'left';
        sprite.x = sprite.x-sprite.maxSpeed;
      }

      if (sprite.y<=y) {
        sprite.y = sprite.y + sprite.maxSpeed;
      }
      else {
        sprite.y = sprite.y-sprite.maxSpeed;
      }
    }
    else {
      return this.basicAI(sprite);
    }
  return sprite;
}

preyAI(sprite: Sprite, x: number, y: number, range: number) {
  let distance = Math.pow(Math.pow(sprite.x-x,2) + Math.pow(sprite.y-y,2), 0.5)
  if (distance<=range) {
    if (sprite.x<=x) {
      sprite.direction = 'left';
      sprite.x = sprite.x-sprite.maxSpeed;
    }
    else {
      sprite.direction = 'right';
      sprite.x = sprite.x+sprite.maxSpeed;
    }

    if (sprite.y<=y) {
      sprite.y = sprite.y-sprite.maxSpeed;
    }
    else {
      sprite.y = sprite.y+sprite.maxSpeed;
    }
  }
  else {
    return this.basicAI(sprite);
  }
return sprite;
}
}
