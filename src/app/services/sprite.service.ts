import { Injectable } from '@angular/core';

export interface Sprite {
  name: string;
  visibility: boolean;
  state: number; // 1=moving, 0=stationary
  direction: string; // left, right
  lastDirection: string;
  maxSpeed: number; 
  acceleration: number;
  scale: number;
  playable: boolean;

  url: string;
  fps: number; //frames per second
  x: number; // horizontal coordinate
  y: number; //vertical coordinate

  rows: number; // how many rows in your sprite sheet
  columns: number; //how many columns in your sprite sheet

  spriteReference: any;

  leftFrames: number[];
  rightFrames: number[];
};

@Injectable({
  providedIn: 'root'
})
export class SpriteService {
  coin:Sprite={
    name: 'Coin',
    visibility: true,
    state: 0,
    direction: 'right',
    lastDirection: 'right',
    maxSpeed: 10,
    acceleration: 1,
    scale: 1,
    playable: true,
    url: '../assets/Sprites/coin.png',
    fps: 6,
    x: 200,
    y: 200,
    rows: 2,
    columns: 2,
    spriteReference: null,
    leftFrames: [0, 3],
    rightFrames: [0, 3]
  };
  cloud:Sprite={
  name: 'Cloud',
  visibility: true,
  state: 0,
  direction: 'right',
  lastDirection: 'right',
  maxSpeed: 10,
  acceleration: 1,
  scale: 1.5,
  playable: false,
  url: '../assets/Sprites/cloud.png',
  fps: 4,
  x: 200,
  y: 200,
  rows: 2,
  columns: 2,
  spriteReference: null,
  leftFrames: [0, 3],
  rightFrames: [0, 3]
  }

  sprites:Sprite[]=[
    {
      name: 'Birb',
      visibility: true,
      state: 0,
      direction: 'right',
      lastDirection: 'right',
      maxSpeed: 10,
      acceleration: 1,
      scale: 1.7,
      playable: false,
      url: '../assets/Sprites/birb.png',
      fps: 4,
      x: 200,
      y: 200,
      rows: 2,
      columns: 2,
      spriteReference: null,
      leftFrames: [0, 1],
      rightFrames: [2, 3]
    },
    
  ];

  constructor() { }

  populateCoin(numberToPopulate: number) {
    for (let i=0; i<numberToPopulate; i++) {
      let coin = this.coin;
      this.coin.x = Math.floor(Math.random() * 50* i);
      this.coin.y = Math.floor(Math.random() * 50* i);
      this.sprites.push(JSON.parse(JSON.stringify(coin)));
    }
  }

  populateCloud(numberToPopulate: number) {
    for (let i=0; i<numberToPopulate; i++) {
      let coin = this.coin;
      this.cloud.x = Math.floor(Math.random() * 50* i);
      this.cloud.y = Math.floor(Math.random() * 50* i);
      this.sprites.push(JSON.parse(JSON.stringify(coin)));
    }
  }
}