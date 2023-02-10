import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGridParameterComponent } from './data-grid-parameter.component';

describe('DataGridParameterComponent', () => {
  let component: DataGridParameterComponent;
  let fixture: ComponentFixture<DataGridParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataGridParameterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataGridParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
