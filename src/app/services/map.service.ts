import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  MAX_X: number = 3000;
  MAX_Y: number = 3000;

  constructor() { }

  init(two: any) {
    let sky = two.makeRectangle (0, 0, 6000, 6000);
    sky.fill = '#000000';
  }
}
