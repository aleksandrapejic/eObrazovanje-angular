import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredispitneObavezeSablonManagementComponent } from './predispitne-obaveze-sablon-management.component';

describe('PredispitneObavezeSablonManagementComponent', () => {
  let component: PredispitneObavezeSablonManagementComponent;
  let fixture: ComponentFixture<PredispitneObavezeSablonManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredispitneObavezeSablonManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredispitneObavezeSablonManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
