import {Component, OnInit} from '@angular/core';
import {Draw, MyDraw} from "../draw";
import {EuroMillionsService} from "../services/euromillions.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-draw-results',
  templateUrl: './draw-results.component.html',
  styleUrls: ['./draw-results.component.css']
})
export class DrawResultsComponent implements OnInit {

  draws: Draw[] = [];

  constructor(private euroMillionsService: EuroMillionsService) {

    this.update();
  }

  update() {
    Observable.zip(this.euroMillionsService.getDraws(), this.euroMillionsService.getMyDraws(), (draws: Draw[], myDraws: MyDraw[]) => {
      this.draws = [];
      for (let draw of draws) {

        for (let myDraw of myDraws) {

          let match: boolean = draw.match({numbers: myDraw.numbers, stars: myDraw.stars});
          if (match === true) {
            draw.matchMyDraws.push(myDraw);
          }
        }
        this.draws.push(draw);
      }
    }).subscribe();
  }

  ngOnInit() {
  }

}
