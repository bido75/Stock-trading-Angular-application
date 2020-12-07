import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockalertComponent } from './stockalert.component';

describe('StockalertComponent', () => {
  let component: StockalertComponent;
  let fixture: ComponentFixture<StockalertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockalertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockalertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
