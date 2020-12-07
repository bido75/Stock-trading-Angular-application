import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchticker',
  templateUrl: './searchticker.component.html',
  styleUrls: ['./searchticker.component.css'],
})
export class SearchtickerComponent implements OnInit {
  options;
  IsWait;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  // generatesugg(event) {
  //   this.IsWait = true;
  //   const ticker = event.target.value;
  //   if (ticker != ' ') {
  //     const url =
  //       'https://stock-search-nodejs-be.wl.r.appspot.com/suggestions/' + ticker;

  //     fetch(url).then((response) => {
  //       response.json().then((data) => {
  //         this.options = data;
  //         console.log(this.options);
  //       });
  //     });

  //     setTimeout(() => (this.IsWait = false), 1000);
  //   } else {
  //     this.IsWait = false;
  //     this.options = [];
  //   }
  // }

  generatesugg(value) {
    this.IsWait = true;

    if (value != '') {
      console.log('value is', value);
      const url =
        'https://stock-search-nodejs-be.wl.r.appspot.com/suggestions/' + value;

      fetch(url).then((response) => {
        response.json().then((data) => {
          this.options = data;
          console.log(this.options);
        });
      });

      setTimeout(() => (this.IsWait = false), 1000);
    } else {
      console.log('value is empty');
      this.IsWait = false;
      this.options = [];
    }
  }

  gettickerdetails(t) {
    this.router.navigate(['/details', t]);
  }
}
