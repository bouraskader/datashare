import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGridModelComponent } from './data-grid-model.component';

describe('DataGridVibratorComponent', () => {
  let component: DataGridModelComponent;
  let fixture: ComponentFixture<DataGridModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataGridModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataGridModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
