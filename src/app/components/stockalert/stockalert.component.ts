import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stockalert',
  templateUrl: './stockalert.component.html',
  styleUrls: ['./stockalert.component.css'],
})
export class StockalertComponent implements OnInit {
  @Input() Myalerts;

  constructor() {}

  ngOnInit(): void {}

  removealert(item) {
    const index: number = this.Myalerts.indexOf(item);
    if (index !== -1) {
      this.Myalerts.splice(index, 1);
    }
    console.log(this.Myalerts);
  }
}
