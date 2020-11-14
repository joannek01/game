import { Component, OnInit } from '@angular/core';
import Two from "../assets/two.min.js";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
ngOnInit(): void {
  let elem = document.getElementById('draw-shapes');
  let params = {fullscreen: true};
  let two = new Two(params).appendTo(elem);

  let circle = two.makeCircle(70,50,20);
  circle.fill ='#FF8000';
  let x=70
  let y=50
  let circle2 = two.makeCircle(30,20,10);
  circle2.fill = '#22FFAA';
  let circle3 = two.makeCircle(10,30,10);
  circle3.fill = '#BB1122'
  let circle4 = two.makeCircle(1000,40,30);
  circle4.fill = '#FFFF00';
  let circle5= two.makeCircle(700,100,100);
  circle5.fill = '#1111FF';

  let rect = two.makeRectangle(20,50,50,20);
  rect.fill = '#BBAAFF';
  let rect2 = two.makeRectangle(40,90,20,50);
  rect2.fill = '#FFCCCC';
  let rect3 = two.makeRectangle(70,100,20,20);
  rect3.fill = '#00FFFF';
  let rect4 = two.makeRectangle(150,110,90,100);
  rect4.fill = '#00AAFF';
  let rect5 = two.makeRectangle(300,300,300,500);
  rect5.fill = '#02AA01';
  rect5.opacity = 0.50;
  rect5.stroke = '#FFAACC'; 
  rect5.linewidth = 5;

  let ellipse = two.makeEllipse(500,200,50,30)
  ellipse.fill = "#FF00CC"
  let star = two.makeStar(550,300,30,70,5)

  two.bind('update', (framesPerSecond)=>{
    circle.translation.set(x,y);
    x=x+2;
    y=y+1;
  }).play();

}
  title = 'game';
}