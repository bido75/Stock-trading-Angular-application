import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockwatchlistComponent } from './stockwatchlist.component';

describe('StockwatchlistComponent', () => {
  let component: StockwatchlistComponent;
  let fixture: ComponentFixture<StockwatchlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockwatchlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockwatchlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
