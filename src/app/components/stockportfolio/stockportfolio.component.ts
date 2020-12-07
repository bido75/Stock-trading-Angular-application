import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-stockportfolio',
  templateUrl: './stockportfolio.component.html',
  styleUrls: ['./stockportfolio.component.css'],
})
export class StockportfolioComponent implements OnInit {
  details;
  storagecontents = window.localStorage;
  portfolioarray = this.storagecontents.getItem('portfoliolist');
  portfolioitems;
  tickercurrpricelist = [];
  IsWait;
  constructor(private router: Router, private modalService: NgbModal) {
    this.IsWait = true;
  }

  ngOnInit(): void {
    if (this.portfolioarray) {
      this.portfolioitems = JSON.parse(this.portfolioarray);
      for (let i = 0; i < this.portfolioitems.length; i++) {
        this.tickercurrpricelist.push(this.portfolioitems[i].ticker);

        const url_details =
          'https://stock-search-nodejs-be.wl.r.appspot.com/details/' +
          this.portfolioitems[i].ticker;

        fetch(url_details).then((response) => {
          response.json().then((data) => {
            this.portfolioitems[i].currprice = data.last;
          });
        });
      }
    } else {
      this.portfolioitems = [];
    }
    setTimeout(() => (this.IsWait = false), 2000);
  }

  redirecttodetails(t) {
    this.router.navigate(['/details', t]);
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  onqtyupdate(event) {
    let qval = event.target.value;

    this.onvalueupdate(qval);
  }

  onvalueupdate(qval) {
    if (qval < 1 || qval == ' ') {
      return true;
    } else {
      return false;
    }
  }

  onqtyupdateforSell(event, oqnty) {
    let qval = event.target.value;
    this.onvalueupdateforSell(qval, oqnty);
  }

  onvalueupdateforSell(qval, oqnty) {
    if (qval < 1 || qval == ' ' || qval > oqnty) {
      return true;
    } else {
      return false;
    }
  }

  isdown(x, y) {
    var xFixed = x.toFixed(2);
    var yFixed = y.toFixed(2);

    if (xFixed - yFixed < 0) {
      return true;
    } else {
      return false;
    }
  }

  isup(x, y) {
    var xFixed = x.toFixed(2);
    var yFixed = y.toFixed(2);

    if (xFixed - yFixed > 0) {
      return true;
    } else {
      return false;
    }
  }

  issame(x, y) {
    var xFixed = x.toFixed(2);
    var yFixed = y.toFixed(2);

    if (xFixed - yFixed == 0) {
      return true;
    } else {
      return false;
    }
  }

  onclickBuy(ticker, qval, cprice) {
    for (var i = 0; i < this.portfolioitems.length; i++) {
      if (this.portfolioitems[i].ticker == ticker) {
        let iq = parseInt(this.portfolioitems[i].quantity);

        let newq = iq + parseInt(qval);

        this.portfolioitems[i].quantity = newq;

        let it = parseFloat(this.portfolioitems[i].totalcost);
        let newt = it + parseInt(qval) * parseFloat(cprice);
        this.portfolioitems[i].totalcost = newt;

        break;
      }
    }
    this.storagecontents.setItem(
      'portfoliolist',
      JSON.stringify(this.portfolioitems)
    );
    for (let i = 0; i < this.portfolioitems.length; i++) {
      this.tickercurrpricelist.push(this.portfolioitems[i].ticker);

      const url_details =
        'https://stock-search-nodejs-be.wl.r.appspot.com/details/' +
        this.portfolioitems[i].ticker;

      fetch(url_details).then((response) => {
        response.json().then((data) => {
          this.portfolioitems[i].currprice = data.last;
        });
      });
    }
  }

  onclickSell(ticker, qval, cprice, oqnty) {
    let currentlist = this.storagecontents.getItem('portfoliolist');
    let JSONobjlist = JSON.parse(currentlist);

    if (parseInt(qval) == parseInt(oqnty)) {
      var removeIndex = JSONobjlist.map(function (item) {
        return item.ticker;
      }).indexOf(ticker);
      JSONobjlist.splice(removeIndex, 1);
      this.portfolioitems = JSONobjlist;

      this.storagecontents.setItem(
        'portfoliolist',
        JSON.stringify(JSONobjlist)
      );

      for (let i = 0; i < this.portfolioitems.length; i++) {
        const url_details =
          'https://stock-search-nodejs-be.wl.r.appspot.com/details/' +
          this.portfolioitems[i].ticker;

        fetch(url_details).then((response) => {
          response.json().then((data) => {
            this.portfolioitems[i].currprice = data.last;
          });
        });
      }
    } else {
      for (var i = 0; i < JSONobjlist.length; i++) {
        if (JSONobjlist[i].ticker == ticker) {
          let iq = parseInt(JSONobjlist[i].quantity);

          let newq = iq - parseInt(qval);

          JSONobjlist[i].quantity = newq;

          let it = parseFloat(JSONobjlist[i].totalcost);
          let newt = it - parseInt(qval) * parseFloat(cprice);
          JSONobjlist[i].totalcost = newt;

          break;
        }
      }
      this.storagecontents.setItem(
        'portfoliolist',
        JSON.stringify(JSONobjlist)
      );
      this.portfolioarray = this.storagecontents.getItem('portfoliolist');
      this.portfolioitems = JSON.parse(this.portfolioarray);
      for (let i = 0; i < this.portfolioitems.length; i++) {
        const url_details =
          'https://stock-search-nodejs-be.wl.r.appspot.com/details/' +
          this.portfolioitems[i].ticker;

        fetch(url_details).then((response) => {
          response.json().then((data) => {
            this.portfolioitems[i].currprice = data.last;
          });
        });
      }
    }
  }
}
