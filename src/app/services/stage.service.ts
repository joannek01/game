import { Injectable } from '@angular/core';

export interface Stage {
  level: number;
  speedFactor: number;
  numberOfPreys: number;
  numberOfPredators: number;
  chanceOfBetterAI: number;
  rangeToTriggerBetterAI: number;
}

@Injectable({
  providedIn: 'root'
})
export class StageService {
  
constructor() { }

  public stages: Stage[] = [
    {
      level: 1,
      speedFactor: 1,
      numberOfPreys: 10,
      numberOfPredators: 1,
      chanceOfBetterAI: 0,
      rangeToTriggerBetterAI: 100
    },
    {
      level: 2,
      speedFactor: 1.15,
      numberOfPreys: 15,
      numberOfPredators: 1,
      chanceOfBetterAI: 0.3,
      rangeToTriggerBetterAI: 250
    },
    {
      level: 3,
      speedFactor: 1.2,
      numberOfPreys: 20,
      numberOfPredators: 2,
      chanceOfBetterAI: 0.5,
      rangeToTriggerBetterAI: 500
    }
  ]}