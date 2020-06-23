import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllResultTestComponent } from './all-result-test.component';

describe('AllResultTestComponent', () => {
  let component: AllResultTestComponent;
  let fixture: ComponentFixture<AllResultTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllResultTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllResultTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
