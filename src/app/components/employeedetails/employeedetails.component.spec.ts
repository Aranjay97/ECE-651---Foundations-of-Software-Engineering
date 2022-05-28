import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeedetailsComponent } from './employeedetails.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from 'src/app/module.ts/module.ts.module';

describe('EmployeedetailsComponent', () => {
  let component: EmployeedetailsComponent;
  let fixture: ComponentFixture<EmployeedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,MaterialModule],
      declarations: [ EmployeedetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
