import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { MaterialModule } from 'src/app/module.ts/module.ts.module';
import { LoginService } from 'src/app/service/login.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,MaterialModule],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('component initial state', () => {
    expect(component.submitted).toBeFalsy();
    expect(component.myGroup).toBeDefined();
    expect(component.myGroup.invalid).toBeTruthy();
    expect(component.showErrorMessage).toBeFalsy();
  });

  it('submitted should be true when onSubmit()', () => {
    component.onLogin();
    expect(component.submitted).toBeTruthy();
    expect(component.showErrorMessage).toBeFalsy();
  });
});
