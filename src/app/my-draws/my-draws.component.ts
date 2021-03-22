import {Component, OnInit, Input} from '@angular/core';
import {MyDraw} from "../draw";
import {EuroMillionsService} from "../services/euromillions.service";

@Component({
  selector: 'app-my-draws',
  templateUrl: './my-draws.component.html',
  styleUrls: ['./my-draws.component.css']
})
export class MyDrawsComponent implements OnInit {

  @Input() myDraws: MyDraw[] = [];

  constructor(private euroMillions: EuroMillionsService) {
    euroMillions.getMyDraws().subscribe(
      (draws: MyDraw[]) => {
        this.myDraws = draws;
      }
    );
  }

  ngOnInit() {

  }

  /**
   * Enregistre toutes les grilles
   */
  save(): void {
    this.euroMillions.saveMyDraws(this.myDraws);
  }

  /**
   * Ajoute une grille
   */
  add(): void {
    this.myDraws.push({title: '', numbers: [0, 0, 0, 0, 0], stars: [0, 0]})
  }

  /**
   * Efface le contenu de la grille
   * @param draw
   */
  clean(draw: MyDraw): void {
    draw.title = '';
    draw.numbers = [0, 0, 0, 0, 0];
    draw.stars = [0, 0];
  }

  /**
   * Supprime une grille
   * @param index
   */
  remove(index: number): void {
    this.myDraws.splice(index, 1);
  }
}
