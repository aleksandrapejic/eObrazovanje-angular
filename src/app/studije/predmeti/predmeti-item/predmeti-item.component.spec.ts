import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetiItemComponent } from './predmeti-item.component';

describe('PredmetiItemComponent', () => {
  let component: PredmetiItemComponent;
  let fixture: ComponentFixture<PredmetiItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredmetiItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredmetiItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
