import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerTecnologiaComponent } from './manager-tecnologia.component';

describe('ManagerTecnologiaComponent', () => {
  let component: ManagerTecnologiaComponent;
  let fixture: ComponentFixture<ManagerTecnologiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerTecnologiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerTecnologiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
