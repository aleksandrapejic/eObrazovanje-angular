import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DokumentiComponent } from './dokumenti-management.component';

describe('DokumentiManagamentComponent', () => {
  let component: DokumentiManagamentComponent;
  let fixture: ComponentFixture<DokumentiManagamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DokumentiManagamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DokumentiManagamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
