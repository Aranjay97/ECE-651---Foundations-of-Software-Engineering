import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePayStubComponent } from './employee-pay-stub.component';

describe('EmployeePayStubComponent', () => {
  let component: EmployeePayStubComponent;
  let fixture: ComponentFixture<EmployeePayStubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeePayStubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePayStubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
