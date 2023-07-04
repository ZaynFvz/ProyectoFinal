import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriePelisComponent } from './serie-pelis.component';

describe('SeriePelisComponent', () => {
  let component: SeriePelisComponent;
  let fixture: ComponentFixture<SeriePelisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeriePelisComponent]
    });
    fixture = TestBed.createComponent(SeriePelisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
