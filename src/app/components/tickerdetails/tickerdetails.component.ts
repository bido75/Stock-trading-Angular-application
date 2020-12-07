import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts/highstock';
import { title } from 'process';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewChild } from '@angular/core';
import { interval, Subscription, from } from 'rxjs';

@Component({
  selector: 'app-tickerdetails',
  templateUrl: './tickerdetails.component.html',
  styleUrls: ['./tickerdetails.component.css'],
})
export class TickerdetailsComponent implements OnInit, OnDestroy {
  id: string;
  private sub: any;
  tickerdetails;
  change;
  changeper;
  now;
  mrktstatus;
  mrktstatusline;
  alerttype;
  dailychartdata;
  colorcode;
  buystatus;
  total;
  displayalert;
  alertmessage;
  Myalerts = [];
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: {};
  quantity;
  upchange;
  downchange;
  changecolor;
  subscription: Subscription;
  myStorage = window.localStorage;
  IsWait;
  watchlistarray = this.myStorage.getItem('watchlist');
  watchlistitems;
  nofillstar;
  subscribeset = 0;
  error = false;
  mstatus;

  constructor(private route: ActivatedRoute, private modalService: NgbModal) {
    this.IsWait = true;
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['ticker'];
      var found = 0;
      if (this.watchlistarray) {
        this.watchlistitems = JSON.parse(this.watchlistarray);
        for (var i = 0; i < this.watchlistitems.length; i++) {
          if (this.watchlistitems[i].ticker == this.id) {
            this.nofillstar = false;
            found = 1;
            break;
          }
        }
        if (found == 0) {
          this.nofillstar = true;
        }
      } else {
        this.nofillstar = true;
      }

      const url_details =
        'https://stock-search-nodejs-be.wl.r.appspot.com/details/' + this.id;

      this.getdetails(url_details);
      // console.log(this.mstatus);
      // console.log(this.error);
      setTimeout(() => (this.IsWait = false), 4000);
      // console.log(this.mstatus);
      // console.log(this.error);
      if (this.error == true) return;
      //add code for 15 sec update
      // if (this.mstatus == 'open') {
      //   console.log(this.mrktstatus);
      //   const source = interval(15000);
      //   this.subscribeset = 1;
      //   this.subscription = source.subscribe((val) =>
      //     this.getdetails(url_details)
      //   );
      // }
    });
  }

  setmstatus(status) {
    this.mstatus = status;
  }

  getdetails(url_details) {
    fetch(url_details).then((response) => {
      response.json().then((data) => {
        if (data.hasOwnProperty('detail')) {
          this.error = true;
          return;
        }
        this.tickerdetails = data;
        console.log(this.tickerdetails);

        this.change = (
          this.tickerdetails.last - this.tickerdetails.prevClose
        ).toFixed(2);
        if (this.change < 0) {
          this.changecolor = 'red';
          this.upchange = false;
          this.downchange = true;
        } else {
          this.changecolor = 'green';
          this.upchange = true;
          this.downchange = false;
        }
        this.changeper = (
          ((this.tickerdetails.last - this.tickerdetails.prevClose) * 100) /
          this.tickerdetails.prevClose
        ).toFixed(2);
        this.now =
          new Date().toISOString().slice(0, 10) +
          ' ' +
          new Date().toLocaleTimeString('en-US', { hour12: false }).slice(0, 8);
        this.mrktstatusline = this.getmarketstatusline();
        if (this.mrktstatus == 'open') {
          let startdate = new Date().toISOString().slice(0, 10);
          const url_dailychart =
            'https://stock-search-nodejs-be.wl.r.appspot.com/dailychart/' +
            this.id +
            '&' +
            startdate;
          // console.log(url_dailychart);
          fetch(url_dailychart).then((response) => {
            response.json().then((data) => {
              var stkprice = [];

              for (var i = 0; i < data.length; i++) {
                let d = new Date(data[i].date);
                let UTCdate = Date.UTC(
                  d.getFullYear(),
                  d.getMonth(),
                  d.getDate(),
                  d.getHours(),
                  d.getMinutes(),
                  d.getSeconds()
                );
                stkprice[i] = [UTCdate, data[i].close];

                // console.log(stkprice);
              }
              this.chartOptions = {
                title: {
                  text: this.id,
                },
                navigator: {
                  enabled: true,
                },
                yAxis: [
                  {
                    title: {
                      text: '',
                    },
                    opposite: true,
                  },
                ],
                xAxis: {
                  type: 'datetime',
                },
                rangeSelector: { enabled: false },
                series: [
                  {
                    name: this.id,
                    data: stkprice,
                    type: 'line',
                    color: this.colorcode,
                    yAxis: 0,
                    pointInterval: 3600 * 1000,
                  },
                ],
              };
            });
          });
        } else {
          let tt = new Date(this.tickerdetails.timestamp)
            .toISOString()
            .slice(0, 10);
          const url_dailychart =
            'https://stock-search-nodejs-be.wl.r.appspot.com/dailychart/' +
            this.id +
            '&' +
            tt;
          fetch(url_dailychart).then((response) => {
            response.json().then((data) => {
              var stkprice = [];

              for (var i = 0; i < data.length; i++) {
                var d = new Date(data[i].date);
                var UTCdate = Date.UTC(
                  d.getFullYear(),
                  d.getMonth(),
                  d.getDate(),
                  d.getHours(),
                  d.getMinutes(),
                  d.getSeconds()
                );
                stkprice[i] = [UTCdate, data[i].close];
              }
              this.chartOptions = {
                title: {
                  text: this.id,
                },
                navigator: {
                  enabled: true,
                },
                legend: {
                  enabled: false,
                },
                yAxis: [
                  {
                    title: {
                      text: '',
                    },
                    opposite: true,
                  },
                ],
                xAxis: {
                  type: 'datetime',
                },
                rangeSelector: { enabled: false },
                series: [
                  {
                    name: this.id,
                    data: stkprice,
                    type: 'line',
                    color: this.colorcode,
                    yAxis: 0,
                    pointInterval: 3600 * 1000,
                  },
                ],
              };
            });
          });
        }
        if (this.mrktstatus == 'open') {
          setTimeout(() => this.getdetails(url_details), 15000);
        }
      });
    });
  }

  getmarketstatusline(): string {
    var tt = new Date(this.tickerdetails.timestamp);
    var ttUTCdate = Date.UTC(
      tt.getFullYear(),
      tt.getMonth(),
      tt.getDate(),
      tt.getHours(),
      tt.getMinutes(),
      tt.getSeconds()
    );
    var cur = new Date();
    var curUTCdate = Date.UTC(
      cur.getFullYear(),
      cur.getMonth(),
      cur.getDate(),
      cur.getHours(),
      cur.getMinutes(),
      cur.getSeconds()
    );

    if (curUTCdate - ttUTCdate < 60000) {
      this.alerttype = 'success';
      this.mrktstatus = 'open';
      this.colorcode = 'green';
      this.setmstatus(this.mrktstatus);
      return 'Market is Open';
    } else {
      this.alerttype = 'danger';
      this.mrktstatus = 'closed';
      this.colorcode = 'red';
      this.setmstatus(this.mrktstatus);
      return (
        'Market Closed on ' +
        tt.toISOString().slice(0, 10) +
        ' ' +
        tt.toLocaleTimeString('en-US', { hour12: false }).slice(0, 8)
      );
    }
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  onclickemptystar() {
    this.nofillstar = false;
    var alert = {
      message: this.tickerdetails.ticker + ' added to watchlist.',
      type: 'success',
    };
    this.Myalerts.push(alert);
    setTimeout(() => {
      const index: number = this.Myalerts.indexOf(alert);
      if (index !== -1) {
        this.Myalerts.splice(index, 1);
      }
    }, 5000);

    if (!this.myStorage.getItem('watchlist')) {
      this.myStorage.setItem(
        'watchlist',
        JSON.stringify([
          {
            ticker: this.tickerdetails.ticker,
            name: this.tickerdetails.name,
          },
        ])
      );
    } else {
      let currentlist = this.myStorage.getItem('watchlist');
      let JSONobjlist = JSON.parse(currentlist);
      JSONobjlist.push({
        ticker: this.tickerdetails.ticker,
        name: this.tickerdetails.name,
      });
      function compare(a, b) {
        const tickerA = a.ticker.toUpperCase();
        const tickerB = b.ticker.toUpperCase();

        let comparison = 0;
        if (tickerA > tickerB) {
          comparison = 1;
        } else if (tickerA < tickerB) {
          comparison = -1;
        }
        return comparison;
      }

      JSONobjlist.sort(compare);

      this.myStorage.setItem('watchlist', JSON.stringify(JSONobjlist));
    }
  }

  onclickfilledstar() {
    this.nofillstar = true;
    var alert = {
      message: this.tickerdetails.ticker + ' removed from watchlist.',
      type: 'danger',
    };
    this.Myalerts.push(alert);
    setTimeout(() => {
      const index: number = this.Myalerts.indexOf(alert);
      if (index !== -1) {
        this.Myalerts.splice(index, 1);
      }
    }, 5000);

    let currentlist = this.myStorage.getItem('watchlist');
    let JSONobjlist = JSON.parse(currentlist);
    var removeIndex = JSONobjlist.map(function (item) {
      return item.ticker;
    }).indexOf(this.tickerdetails.ticker);
    JSONobjlist.splice(removeIndex, 1);
    this.watchlistitems = JSONobjlist;

    this.myStorage.setItem('watchlist', JSON.stringify(JSONobjlist));
  }

  onvalueupdate(e) {
    this.quantity = e.target.value;
    if (this.quantity == ' ' || this.quantity < 1) {
      this.buystatus = true;
      this.total = (this.quantity * this.tickerdetails.last).toFixed(2);
    } else {
      this.buystatus = false;
      this.total = (this.quantity * this.tickerdetails.last).toFixed(2);
    }
  }

  onclickBuy() {
    var alert = {
      message: this.tickerdetails.ticker + ' bought successfully.',
      type: 'success',
    };
    this.Myalerts.push(alert);
    setTimeout(() => {
      const index: number = this.Myalerts.indexOf(alert);
      if (index !== -1) {
        this.Myalerts.splice(index, 1);
      }
    }, 5000);

    if (!this.myStorage.getItem('portfoliolist')) {
      this.myStorage.setItem(
        'portfoliolist',
        JSON.stringify([
          {
            ticker: this.tickerdetails.ticker,
            name: this.tickerdetails.name,
            quantity: parseInt(this.quantity),
            totalcost: parseFloat(this.total),
          },
        ])
      );
    } else {
      let currentlist = this.myStorage.getItem('portfoliolist');
      let JSONobjlist = JSON.parse(currentlist);
      let found = 0;
      for (var i = 0; i < JSONobjlist.length; i++) {
        if (JSONobjlist[i].ticker == this.tickerdetails.ticker) {
          let iq = parseInt(JSONobjlist[i].quantity);
          let newq = iq + parseInt(this.quantity);
          JSONobjlist[i].quantity = newq;
          let it = parseFloat(JSONobjlist[i].totalcost);
          let newt = it + parseFloat(this.total);
          JSONobjlist[i].totalcost = newt;
          found = 1;
          break;
        }
      }
      if (found == 0) {
        JSONobjlist.push({
          ticker: this.tickerdetails.ticker,
          name: this.tickerdetails.name,
          quantity: parseInt(this.quantity),
          totalcost: parseFloat(this.total),
        });
      }

      function compare(a, b) {
        const tickerA = a.ticker.toUpperCase();
        const tickerB = b.ticker.toUpperCase();

        let comparison = 0;
        if (tickerA > tickerB) {
          comparison = 1;
        } else if (tickerA < tickerB) {
          comparison = -1;
        }
        return comparison;
      }

      JSONobjlist.sort(compare);

      this.myStorage.setItem('portfoliolist', JSON.stringify(JSONobjlist));
    }
  }

  ngOnDestroy() {
    // if (this.subscribeset == 1) {
    //   this.subscription.unsubscribe();
    // }

    this.sub.unsubscribe();
  }
}
