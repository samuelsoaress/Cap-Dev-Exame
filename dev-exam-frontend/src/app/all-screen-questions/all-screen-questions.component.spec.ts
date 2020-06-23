import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllScreenQuestionsComponent } from './all-screen-questions.component';

describe('AllScreenQuestionsComponent', () => {
  let component: AllScreenQuestionsComponent;
  let fixture: ComponentFixture<AllScreenQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllScreenQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllScreenQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
