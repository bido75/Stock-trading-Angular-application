import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TickerdetailsComponent } from './components/tickerdetails/tickerdetails.component';
import { SearchtickerComponent } from './components/searchticker/searchticker.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTabsModule } from '@angular/material/tabs';
import { HighchartsChartModule } from 'highcharts-angular';
import { TopnewsComponent } from './components/topnews/topnews.component';
import { HistoricalchartComponent } from './components/historicalchart/historicalchart.component';
import { StockalertComponent } from './components/stockalert/stockalert.component';
import { StockportfolioComponent } from './components/stockportfolio/stockportfolio.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StockwatchlistComponent } from './components/stockwatchlist/stockwatchlist.component';
import { FocusDirective } from './directives/focus.directive';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    TickerdetailsComponent,
    SearchtickerComponent,
    TopnewsComponent,
    HistoricalchartComponent,
    StockalertComponent,
    StockportfolioComponent,
    StockwatchlistComponent,
    FocusDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    NgbModule,
    MatTabsModule,
    HighchartsChartModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
