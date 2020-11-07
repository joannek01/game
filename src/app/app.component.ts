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
  let rect = two.makeRectangle(20,50,50,20);
  two.update();
}
  title = 'game';
}
