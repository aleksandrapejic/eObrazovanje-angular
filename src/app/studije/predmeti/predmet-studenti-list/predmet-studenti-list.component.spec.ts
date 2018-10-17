import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetStudentiListComponent } from './predmet-studenti-list.component';

describe('PredmetStudentiListComponent', () => {
  let component: PredmetStudentiListComponent;
  let fixture: ComponentFixture<PredmetStudentiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredmetStudentiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredmetStudentiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
