import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchtickerComponent } from './searchticker.component';

describe('SearchtickerComponent', () => {
  let component: SearchtickerComponent;
  let fixture: ComponentFixture<SearchtickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchtickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchtickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
