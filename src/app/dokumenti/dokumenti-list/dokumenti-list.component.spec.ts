import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DokumentiListComponent } from './dokumenti-list.component';

describe('DokumentiListComponent', () => {
  let component: DokumentiListComponent;
  let fixture: ComponentFixture<DokumentiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DokumentiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DokumentiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
