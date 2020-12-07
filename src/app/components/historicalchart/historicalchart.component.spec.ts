import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalchartComponent } from './historicalchart.component';

describe('HistoricalchartComponent', () => {
  let component: HistoricalchartComponent;
  let fixture: ComponentFixture<HistoricalchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricalchartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
