import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { MapService } from './map.service';
import { Sprite } from './sprite.service';

@Injectable({
  providedIn: 'root'
})
export class CollisionService {

  constructor(private _mapService: MapService) { }

  detectBorder(sprite: Sprite, newX: number, newY: number) {
    const OFFSET = 2;

    let width=sprite.spriteReference.width;
    let height = sprite.spriteReference.height;

    let leftBound = sprite.x-(width/OFFSET);
    let rightBound = sprite.x+(width/OFFSET);
    let upperBound = sprite.y-(height/OFFSET);
    let lowerBound = sprite.y+(height/OFFSET);
  
    if (leftBound<1 && newX<sprite.x) return true
    if (rightBound>this._mapService.MAX_X && newX>sprite.x) return true
    if (upperBound<1 && newY<sprite.y) return true
    if (lowerBound>this._mapService.MAX_Y && newY>sprite.y) return true
    return false
  }
  detectCollision(mySprite: Sprite, targetSprite: Sprite) {
    const OFFSET = 2;

    let width = mySprite.spriteReference.width;
    let height = mySprite.spriteReference.height;

    let leftBound = mySprite.x-(width/OFFSET);
    let rightBound = mySprite.x+(width/OFFSET);
    let upperBound = mySprite.y-(height/OFFSET);
    let lowerBound = mySprite.y+(height/OFFSET);
    width = targetSprite.spriteReference.width;
    height = targetSprite.spriteReference.height;

    let targetLeftBound = targetSprite.x-(width/OFFSET);
    let targetRightBound = targetSprite.x+(width/OFFSET);
    let targetUpperBound = targetSprite.y-(height/OFFSET);
    let targetLowerBound = targetSprite.y+(height/OFFSET);

    if ((leftBound<targetLeftBound && targetLeftBound<rightBound)
    || (leftBound<targetRightBound && targetRightBound<rightBound)) {
      if ((upperBound<targetUpperBound && targetUpperBound<lowerBound)
      || (upperBound<targetLowerBound && targetLowerBound<lowerBound)) {
        targetSprite.scale=0; console.log("collision")
      }
    }
  }
}
