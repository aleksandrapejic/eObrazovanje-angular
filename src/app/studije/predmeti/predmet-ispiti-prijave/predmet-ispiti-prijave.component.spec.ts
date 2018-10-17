import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetIspitiPrijaveComponent } from './predmet-ispiti-prijave.component';

describe('PredmetIspitiPrijaveComponent', () => {
  let component: PredmetIspitiPrijaveComponent;
  let fixture: ComponentFixture<PredmetIspitiPrijaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredmetIspitiPrijaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredmetIspitiPrijaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
