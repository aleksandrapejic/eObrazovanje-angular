import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetiManagementComponent } from './predmeti-management.component';

describe('PredmetiManagementComponent', () => {
  let component: PredmetiManagementComponent;
  let fixture: ComponentFixture<PredmetiManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredmetiManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredmetiManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
