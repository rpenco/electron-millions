import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {EuroMillionsService} from "./services/euromillions.service";
import {MoneyPipe} from './money.pipe';
import {DrawComponent} from './draw/draw.component';
import {NavComponent} from './nav/nav.component';
import {MyDrawsComponent} from './my-draws/my-draws.component';
import {DrawResultsComponent} from './draw-results/draw-results.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: 'results',
    component: DrawResultsComponent,
  }, {
    path: 'grids',
    component: MyDrawsComponent,
  }, {
    path: '',
    redirectTo: 'results',
    pathMatch: 'full'
  }
];
@NgModule({
  declarations: [
    AppComponent,
    MoneyPipe,
    DrawComponent,
    NavComponent,
    MyDrawsComponent,
    DrawResultsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [EuroMillionsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
