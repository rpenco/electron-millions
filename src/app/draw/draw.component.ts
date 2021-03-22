import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})
export class DrawComponent implements OnInit {

  @Input() draw;
  constructor() { }

  ngOnInit() {
  }

}
