import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SatisticComponent } from './satistic.component';

describe('SatisticComponent', () => {
  let component: SatisticComponent;
  let fixture: ComponentFixture<SatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
