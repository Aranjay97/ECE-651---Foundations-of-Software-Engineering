import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EmployeeattendanceComponent } from './employeeattendance.component';
import { MaterialModule } from 'src/app/module.ts/module.ts.module';

describe('EmployeeattendanceComponent', () => {
  let component: EmployeeattendanceComponent;
  let fixture: ComponentFixture<EmployeeattendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule,MaterialModule ],
      declarations: [ EmployeeattendanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeattendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
