import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-stockwatchlist',
  templateUrl: './stockwatchlist.component.html',
  styleUrls: ['./stockwatchlist.component.css'],
})
export class StockwatchlistComponent implements OnInit {
  IsWait;
  storagecontents = window.localStorage;
  watchlistarray = this.storagecontents.getItem('watchlist');
  watchlistitems;
  constructor(private router: Router) {
    this.IsWait = true;
  }

  ngOnInit(): void {
    if (this.watchlistarray) {
      this.watchlistitems = JSON.parse(this.watchlistarray);
      for (let i = 0; i < this.watchlistitems.length; i++) {
        const url_details =
          'https://stock-search-nodejs-be.wl.r.appspot.com/details/' +
          this.watchlistitems[i].ticker;

        fetch(url_details).then((response) => {
          response.json().then((data) => {
            this.watchlistitems[i].currprice = data.last.toFixed(2);
            this.watchlistitems[i].change = (
              data.last - data.prevClose
            ).toFixed(2);
            this.watchlistitems[i].changeper = (
              ((data.last - data.prevClose) * 100) /
              data.prevClose
            ).toFixed(2);
          });
        });
      }
    } else {
      this.watchlistitems = [];
    }
    setTimeout(() => (this.IsWait = false), 2000);
  }

  isUp(cval) {
    if (cval > 0) {
      return true;
    } else {
      return false;
    }
  }

  isDown(cval) {
    if (cval < 0) {
      return true;
    } else {
      return false;
    }
  }

  isSame(cval) {
    if (cval == 0) {
      return true;
    } else {
      return false;
    }
  }

  removewatchlistitem(item) {
    var removeIndex = this.watchlistitems
      .map(function (item) {
        return item.ticker;
      })
      .indexOf(item.ticker);
    this.watchlistitems.splice(removeIndex, 1);

    for (let i = 0; i < this.watchlistitems.length; i++) {
      const url_details =
        'https://stock-search-nodejs-be.wl.r.appspot.com/details/' +
        this.watchlistitems[i].ticker;

      fetch(url_details).then((response) => {
        response.json().then((data) => {
          this.watchlistitems[i].currprice = data.last.toFixed(2);
          this.watchlistitems[i].change = (data.last - data.prevClose).toFixed(
            2
          );
          this.watchlistitems[i].changeper = (
            ((data.last - data.prevClose) * 100) /
            data.prevClose
          ).toFixed(2);
        });
      });
    }

    this.storagecontents.setItem(
      'watchlist',
      JSON.stringify(this.watchlistitems)
    );
  }

  redirecttodetails(t) {
    this.router.navigate(['/details', t]);
  }
}
