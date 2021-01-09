import { Component, HostListener, OnInit } from '@angular/core';
import Two from "../assets/two.min.js";
import { Sprite, SpriteService } from './services/sprite.service.js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  x: number=200;
  y: number=200;
  
  constructor(private _spriteService: SpriteService){}

  @HostListener('document:keydown', ['$event'])
  handlekey(event: KeyboardEvent) {
    if (event.key=='ArrowRight') {
      this.x=this.x+10;
      this._spriteService.sprites[0].direction='right';
    }
    else if (event.key=='ArrowLeft') {
      this.x=this.x-10;
      this._spriteService.sprites[0].direction='left';
    }
    else if (event.key=='ArrowUp') {
      this.y=this.y-10;
    }
    else if (event.key=='ArrowDown') {
      this.y=this.y+10
    }
  }

ngOnInit(): void {
  let elem = document.getElementById('draw-shapes');
  let params = {fullscreen: true};
  let two = new Two(params).appendTo(elem);

  for (let i=0; i<this._spriteService.sprites.length; i++) {
    //console.log(this._spriteService.sprites[i]);
    let sprite=this._spriteService.sprites[i];
    this._spriteService.sprites[i].spriteReference=two.makeSprite(sprite.url, sprite.x, sprite.y, sprite.columns, sprite.rows, sprite.fps);
    this._spriteService.sprites[i].spriteReference.play(this._spriteService.sprites[i].rightFrames[0], this._spriteService.sprites[i].rightFrames[1]);
    //this._spriteService.sprites[i].spriteReference.scale=.5;
  }

  //rectangle.scale=.7;
  two.bind('update', (framesPerSecond)=>{
    // this is where animatoin happens
    this._spriteService.sprites[0].spriteReference.translation.x=this.x;
    this._spriteService.sprites[0].spriteReference.translation.y=this.y;

    for(let i=0; i<this._spriteService.sprites.length; i++) {
      if (this._spriteService.sprites[i].direction !=this._spriteService.sprites[i].lastDirection) {
        this._spriteService.sprites[i].lastDirection=this._spriteService.sprites[i].direction;
        if (this._spriteService.sprites[i].direction=='right')
          this._spriteService.sprites[i].spriteReference.play(this._spriteService.sprites[i].rightFrames[0], this._spriteService.sprites[i].rightFrames[1])
        }
        else {
          this._spriteService.sprites[i].spriteReference.play(this._spriteService.sprites[i].leftFrames[0], this._spriteService.sprites[i].leftFrames[1])
        }
      }
  }).play(); 

}
  //title = 'game';
}