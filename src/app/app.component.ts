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

  //let rectangle = two.makeRectangle(300,200,70,30)
  
  let circle = two.makeCircle(200,70,50)

  //let ellipse = two.makeEllipse(500,200,50,30)
  //ellipse.fill = "#FF00CC"
  //let star = two.makeStar(550,300,30,70,5)
  
  let scaleDelta = 0.1

  two.bind('update', (framesPerSecond)=>{
    //let changeintime = Date.now()/1000;
    circle.scale = circle.scale+scaleDelta
    if (circle.scale > 5) {
      scaleDelta = -.01
    }
    if (circle.scale < 0.5) {
      scaleDelta = .01
    }
    //rectangle.rotation = 5*changeintime%Math.PI;
    //ellipse.rotation = 10*changeintime%Math.PI;
  }).play();


}
  title = 'game';
}