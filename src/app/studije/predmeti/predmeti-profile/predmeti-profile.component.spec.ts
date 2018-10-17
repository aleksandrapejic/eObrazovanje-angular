import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetiProfileComponent } from './predmeti-profile.component';

describe('PredmetiProfileComponent', () => {
  let component: PredmetiProfileComponent;
  let fixture: ComponentFixture<PredmetiProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredmetiProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredmetiProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
