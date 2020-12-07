import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TickerdetailsComponent } from './tickerdetails.component';

describe('TickerdetailsComponent', () => {
  let component: TickerdetailsComponent;
  let fixture: ComponentFixture<TickerdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TickerdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TickerdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
