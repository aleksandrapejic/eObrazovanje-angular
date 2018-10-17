import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetStudentiPredispitneObavezeComponent } from './predmet-studenti-predispitne-obaveze.component';

describe('PredmetStudentiPredispitneObavezeComponent', () => {
  let component: PredmetStudentiPredispitneObavezeComponent;
  let fixture: ComponentFixture<PredmetStudentiPredispitneObavezeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredmetStudentiPredispitneObavezeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredmetStudentiPredispitneObavezeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
