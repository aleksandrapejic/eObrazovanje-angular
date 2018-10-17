import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UplateManagementComponent } from './uplate-management.component';

describe('UplateManagementComponent', () => {
  let component: UplateManagementComponent;
  let fixture: ComponentFixture<UplateManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UplateManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UplateManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
