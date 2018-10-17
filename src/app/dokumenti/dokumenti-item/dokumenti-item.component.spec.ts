import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DokumentiItemComponent } from './dokumenti-item.component';

describe('DokumentiItemComponent', () => {
  let component: DokumentiItemComponent;
  let fixture: ComponentFixture<DokumentiItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DokumentiItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DokumentiItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
