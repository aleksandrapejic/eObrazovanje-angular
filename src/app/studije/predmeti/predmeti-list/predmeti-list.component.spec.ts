import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetiListComponent } from './predmeti-list.component';

describe('PredmetiListComponent', () => {
  let component: PredmetiListComponent;
  let fixture: ComponentFixture<PredmetiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredmetiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredmetiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
