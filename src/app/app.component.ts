import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import Two from '../assets/two.min.js';
import { AiService } from './services/ai.service.js';
import { AudioService } from './services/audio.service.js';
import { CameraService } from './services/camera.service';
import { CollisionService } from './services/collision.service.js';
import { GameService } from './services/game.service.js';
import { MapService } from './services/map.service.js';
import { SpriteService } from './services/sprite.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  direction:string;
  
  x: number=200;
  y: number=200;

  max_x: number= 3000;
  max_y: number= 3000;

  gameState: string = '';

  constructor(private _spriteService: SpriteService, 
    private _cameraService: CameraService, 
    private _aiService: AiService, 
    private _mapService: MapService,
    private _collisionService: CollisionService,
    private _audioService: AudioService,
    private _gameService: GameService,) {}

  @HostListener('document:keydown', ['$event'])
  handleKey(event: any) {
    if (event.key=='ArrowRight') {
      this.x=this.x+10;
      this._spriteService.sprites[0].direction='right'
    }
    else if (event.key=='ArrowLeft') {
      this.x=this.x-10;
      this._spriteService.sprites[0].direction='left';
    }
    else if (event.key =='ArrowUp') {
      this.y=this.y-10;
    }
    else if (event.key=='ArrowDown') {
      this.y=this.y+10;
    }
    event.preventDefault();
  }

  ngOnInit(): void {
    let elem = document.getElementById('map');
    let params = {
      width: this._mapService.MAX_X,
      height: this._mapService.MAX_Y

    };
    let two = new Two(params).appendTo(elem);

    document.addEventListener('click', ()=>{
      this._audioService.playBackgroundMusic();
      if (this.gameState == 'opening') {
        this._gameService.state = 'playing';
      }
    })

    this.initialize(two);

    this._gameService.stateObservable.subscribe((value)=>{
      this.gameState = value;
      switch(value) {
        case 'opening':
        this._gameService.displayTitle(two)
        break;
      case 'playing':
        this.initialize(two);
        //this._gameService.hideTitle();
        //this._gameService.initScore(two);
        break;
      case 'gameover':
        this._gameService.displayGameover(two);
        break;
      }
    })

    two.bind('update', (framesPerSecond)=>{
      if (this.gameState == 'opening') {
        this.opening(two);
        this.playing(two, true);
      }
      else if (this.gameState == 'playing') {
        this.playing(two);
      }
      else if (this.gameState == 'gameover') {
        //nothing happens here
      }
    }).play();
  }

  initialize(two: any) {
    for (let i=this._spriteService.sprites.length-1; i>0; i--) {
      this._spriteService.sprites[i].scale = 0;
      if (this._spriteService.sprites[i].spriteReference) {
        this._spriteService.sprites[i].spriteReference.scale = 0
      }
      this._spriteService.sprites.splice(i,1)
    }
    this._spriteService.sprites[0].x = 200;
    this._spriteService.sprites[0].y = 200;
    this._spriteService.sprites[0].state = 0;

    if(this._spriteService.sprites[0].spriteReference) this._spriteService.sprites[0].spriteReference.scale = 0;

    this.x = 200;
    this.y = 200;
    this._spriteService.populateMadcloud (3);
    this._spriteService.populateCoin (100);
    this._spriteService.populateCloud (2);
    this._spriteService.populateStar (4);
    this._mapService.init(two);
    this._cameraService.init(this.max_x, this.max_y);
    this._gameService.initScore(two,100);

    for (let i=this._spriteService.sprites.length-1; i>=0; i--) {
      let sprite=this._spriteService.sprites[i];
      this._spriteService.sprites[i].spriteReference=two.makeSprite(sprite.url, sprite.x, sprite.y, sprite.columns, sprite.rows, sprite.fps);
      this._spriteService.sprites[i].spriteReference.play(this._spriteService.sprites[i].rightFrames[0], this._spriteService.sprites[i].rightFrames[1]);
      this._spriteService.sprites[i].spriteReference.scale=this._spriteService.sprites[i].scale;
    }

  }

  opening(two:any) {
    this._gameService.animateTitle()
  }

    playing(two: any, autopilot = false){
      if (!autopilot){
        if (!this._collisionService.detectBorder(this._spriteService.sprites[0], this.x, this.y, this._spriteService.sprites[0].x, this._spriteService.sprites[0].y)) { 
          this._spriteService.sprites[0].spriteReference.translation.x=this.x;
          this._spriteService.sprites[0].x = this.x;
          this._spriteService.sprites[0].spriteReference.translation.y=this.y;
          this._spriteService.sprites[0].y = this.y;
          this._cameraService.zoomCamera(this.x, this.y);
        } 
        else {
          this.x = this._spriteService.sprites[0].x;
          this.y = this._spriteService.sprites[0].y;
        }
      }
      if (this._spriteService.sprites[0].state <0 ) {
        this._gameService.state= 'gameover'
      }
      
    for (let i= this._spriteService.sprites.length-1; i>=0; i--) {
          if (i>0 || autopilot) {
            if (!this._spriteService.sprites[i]) continue;
            let oldX = this._spriteService.sprites[i].x;
            let oldY = this._spriteService.sprites[i].y;
            this._spriteService.sprites[i] = this._aiService.basicAI(this._spriteService.sprites[i]);
            if (!this._collisionService.detectBorder(this._spriteService.sprites[i], this._spriteService.sprites[i].x, this._spriteService.sprites[i].y, oldX, oldY)) {
            this._spriteService.sprites[i].spriteReference.translation.x = this._spriteService.sprites[i].x;
            this._spriteService.sprites[i].spriteReference.translation.y = this._spriteService.sprites[i].y;
            this._spriteService.sprites[i].spriteReference.scale = this._spriteService.sprites[i].scale;
            }
            else {
              this._spriteService.sprites[i].x=oldX;
              this._spriteService.sprites[i].y=oldY;
            }
            this._collisionService.detectCollision(this._spriteService.sprites[0], this._spriteService.sprites[i]);
          }
        
          if (this._spriteService.sprites[i].direction != this._spriteService.sprites[i].lastDirection) {
            this._spriteService.sprites[i].lastDirection=this._spriteService.sprites[i].direction;
            if (this._spriteService.sprites[i].direction=='right') {
              this._spriteService.sprites[i].spriteReference.play(this._spriteService.sprites[i].rightFrames[0], this._spriteService.sprites[i].rightFrames[1])
            }
            else {
              this._spriteService.sprites[i].spriteReference.play(this._spriteService.sprites[i].leftFrames[0], this._spriteService.sprites[i].leftFrames[1])
            }
            if (!autopilot) this._collisionService.detectCollision(this._spriteService.sprites[0], this._spriteService.sprites[i]);
          }
        }
        let numberOfCoins = 0;
        for (let sprite of this._spriteService.sprites) {
          if (sprite.type=='prey' && sprite.spriteReference.scale>0) {
            numberOfCoins++
          }
        }
        this._gameService.displayScore(this.x, this.y, numberOfCoins);
    }

  title = 'Game';

}
