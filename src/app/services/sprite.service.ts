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
  type: string;

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
    type: 'prey',
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
    type: 'object',
    visibility: true,
    state: 0,
    direction: 'right',
    lastDirection: 'right',
    maxSpeed: 0,
    acceleration: 0,
    scale: 3,
    playable: true,
    url: '../assets/Sprites/cloud.png',
    fps: 0,
    x: 200,
    y: 200,
    rows: 1,
    columns: 1,
    spriteReference: null,
    leftFrames: [0, 0],
    rightFrames: [0, 0]
  };
  madcloud:Sprite={
  name: 'Madcloud',
  type: 'predator',
  visibility: true,
  state: 0,
  direction: 'right',
  lastDirection: 'right',
  maxSpeed: 10,
  acceleration: 1,
  scale: 4,
  playable: false,
  url: '../assets/Sprites/madcloud.png',
  fps: 4,
  x: 200,
  y: 200,
  rows: 2,
  columns: 2,
  spriteReference: null,
  leftFrames: [0, 3],
  rightFrames: [0, 3]
  };
    star:Sprite={
    name: 'Star',
    type: 'object',
    visibility: true,
    state: 0,
    direction: 'right',
    lastDirection: 'right',
    maxSpeed: 0,
    acceleration: 0,
    scale: 3,
    playable: true,
    url: '../assets/Sprites/star.png',
    fps: 2,
    x: 200,
    y: 200,
    rows: 2,
    columns: 1,
    spriteReference: null,
    leftFrames: [0, 1],
    rightFrames: [0, 1]
  };
  sprites:Sprite[]=[
    {
      name: 'Birb',
      type: 'self',
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
  };

  populateMadcloud(numberToPopulate: number) {
    for (let i=0; i<numberToPopulate; i++) {
      let Madcloud = this.madcloud;
      this.madcloud.x = Math.floor(Math.random() * 300* i);
      this.madcloud.y = Math.floor(Math.random() * 300* i);
      this.sprites.push(JSON.parse(JSON.stringify(Madcloud)));
    }
  }

  populateCloud(numberToPopulate: number) {
    for (let i=0; i<numberToPopulate; i++) {
      let cloud = this.cloud;
      this.cloud.x = Math.floor(Math.random() * 300* i);
      this.cloud.y = Math.floor(Math.random() * 300* i);
      this.sprites.push(JSON.parse(JSON.stringify(cloud)));
    }
  };

  populateStar(numberToPopulate: number) {
    for (let i=0; i<numberToPopulate; i++) {
      let star = this.star;
      this.star.x = Math.floor(Math.random() * 300* i);
      this.star.y = Math.floor(Math.random() * 300* i);
      this.sprites.push(JSON.parse(JSON.stringify(star)));
    }
  }
}