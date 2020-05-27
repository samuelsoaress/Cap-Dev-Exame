import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewtecnologiesComponent } from './newtecnologies.component';

describe('NewtecnologiesComponent', () => {
  let component: NewtecnologiesComponent;
  let fixture: ComponentFixture<NewtecnologiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewtecnologiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewtecnologiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
