import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateSelectedComponent } from './date-selected.component';

describe('DateSelectedComponent', () => {
  let component: DateSelectedComponent;
  let fixture: ComponentFixture<DateSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateSelectedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
