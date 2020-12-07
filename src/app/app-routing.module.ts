import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TickerdetailsComponent } from './components/tickerdetails/tickerdetails.component';
import { SearchtickerComponent } from './components/searchticker/searchticker.component';
import { StockportfolioComponent } from './components/stockportfolio/stockportfolio.component';
import { StockwatchlistComponent } from './components/stockwatchlist/stockwatchlist.component';
import { AppComponent } from './app.component';
import { from } from 'rxjs';

const routes: Routes = [
  { path: 'details/:ticker', component: TickerdetailsComponent },
  { path: 'portfolio', component: StockportfolioComponent },
  { path: 'watchlist', component: StockwatchlistComponent },
  { path: '', component: SearchtickerComponent },
  { path: '**', component: SearchtickerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
