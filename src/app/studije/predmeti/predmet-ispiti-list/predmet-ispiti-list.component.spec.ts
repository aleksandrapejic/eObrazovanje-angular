import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetIspitiListComponent } from './predmet-ispiti-list.component';

describe('PredmetIspitiListComponent', () => {
  let component: PredmetIspitiListComponent;
  let fixture: ComponentFixture<PredmetIspitiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredmetIspitiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredmetIspitiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
