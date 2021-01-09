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
}

@Injectable({
  providedIn: 'root'
})
export class SpriteService {
  sprites:Sprite[]=[
    {
      name: 'Birb',
      visibility: true,
      state: 0,
      direction: 'right',
      lastDirection: 'right',
      maxSpeed: 10,
      acceleration: 1,
      scale: 1.5,
      playable: true,
      url: '../assets/Sprites/birb.png',
      fps: 2,
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
}