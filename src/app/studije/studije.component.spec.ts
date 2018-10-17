import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudijeComponent } from './studije.component';

describe('StudijeComponent', () => {
  let component: StudijeComponent;
  let fixture: ComponentFixture<StudijeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudijeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
