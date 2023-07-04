import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomenetflixComponent } from './homenetflix.component';

describe('HomenetflixComponent', () => {
  let component: HomenetflixComponent;
  let fixture: ComponentFixture<HomenetflixComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomenetflixComponent]
    });
    fixture = TestBed.createComponent(HomenetflixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
