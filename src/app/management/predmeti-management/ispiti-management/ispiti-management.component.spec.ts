import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IspitiManagementComponent } from './ispiti-management.component';

describe('IspitiManagementComponent', () => {
  let component: IspitiManagementComponent;
  let fixture: ComponentFixture<IspitiManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IspitiManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IspitiManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
