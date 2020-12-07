import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-topnews',
  templateUrl: './topnews.component.html',
  styleUrls: ['./topnews.component.css'],
})
export class TopnewsComponent implements OnInit {
  @Input() ticker: string;
  news_articles = [];

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    const url_news =
      'https://stock-search-nodejs-be.wl.r.appspot.com/topnews/' + this.ticker;
    fetch(url_news).then((response) => {
      response.json().then((doc) => {
        // console.log(doc);
        var count = 0;
        for (let i = 0; i < doc.articles.length && count < 20; i++) {
          if (
            !doc.articles[i].hasOwnProperty('urlToImage') ||
            doc.articles[i].urlToImage == null ||
            doc.articles[i].urlToImage == '' ||
            !doc.articles[i].hasOwnProperty('title') ||
            doc.articles[i].title == null ||
            doc.articles[i].title == '' ||
            !doc.articles[i].hasOwnProperty('publishedAt') ||
            doc.articles[i].publishedAt == null ||
            doc.articles[i].publishedAt == '' ||
            !doc.articles[i].hasOwnProperty('url') ||
            doc.articles[i].url == null ||
            doc.articles[i].url == '' ||
            !doc.articles[i].hasOwnProperty('description') ||
            doc.articles[i].description == null ||
            doc.articles[i].description == ''
          ) {
            continue;
          } else {
            const event = new Date(doc.articles[i].publishedAt);
            const UTCdate = Date.UTC(
              event.getFullYear(),
              event.getMonth(),
              event.getDate()
            );
            const options = { year: 'numeric', month: 'long', day: 'numeric' };

            const pd = event.toLocaleDateString('en-US', options);
            const tl =
              'https://twitter.com/intent/tweet?text=' +
              doc.articles[i].title +
              '&url=' +
              doc.articles[i].url;
            const fb =
              'https://www.facebook.com/sharer/sharer.php?u=' +
              doc.articles[i].url;

            this.news_articles.push({
              urlToImage: doc.articles[i].urlToImage,
              title: doc.articles[i].title,
              publishedAt: pd,
              url: doc.articles[i].url,
              description: doc.articles[i].description,
              publisher: doc.articles[i].source.name,
              twitterlink: tl,
              fblink: fb,
            });

            // console.log(this.news_articles);
            count += 1;
          }
        }
      });
    });
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }
}
