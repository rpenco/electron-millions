import {Injectable} from '@angular/core';
import {Draw, DrawParser, MyDraw} from "../draw";
import {Http} from "@angular/http";
import {Observable} from "rxjs";

import 'rxjs/Rx';

@Injectable()
export class EuroMillionsService {

  constructor(private http: Http) {

  }

  getDraws(): Observable<Draw[]> {

    return this.http.get('assets/rss.xml').map(
      data => DrawParser.parse(data.text(), 'euromillions'),
      err => console.log(err)
    );
  }

  getMyDraws(): Observable<MyDraw[]> {
    let draws: MyDraw[] = JSON.parse(localStorage.getItem('mydraws') || '[]');
    return Observable.of(draws);
  }

  saveMyDraws(myDraws: MyDraw[]) {
    localStorage.setItem('mydraws', JSON.stringify(myDraws));
  }
}
