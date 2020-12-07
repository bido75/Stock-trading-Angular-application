import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockportfolioComponent } from './stockportfolio.component';

describe('StockportfolioComponent', () => {
  let component: StockportfolioComponent;
  let fixture: ComponentFixture<StockportfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockportfolioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockportfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
