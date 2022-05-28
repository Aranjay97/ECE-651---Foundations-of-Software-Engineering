import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {FormControl,ReactiveFormsModule,FormGroupDirective, NgForm, Validators,FormsModule} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { MaterialModule } from './module.ts/module.ts.module';
import { DefaultModule } from './components/default/default.module';
import { UsernotfoundComponent } from './components/usernotfound/usernotfound.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeedetailsComponent } from './components/employeedetails/employeedetails.component';
import { EmployeeattendanceComponent } from './components/employeeattendance/employeeattendance.component';
import { EmployeelistComponent } from './components/employeelist/employeelist.component';
import { ModalModule } from './components/_modal';
import { LeavetrackerComponent } from './components/leavetracker/leavetracker.component';
import { ApplyLeaveComponent } from './components/apply-leave/apply-leave.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { EmployeespaystubsComponent } from './components/employeespaystubs/employeespaystubs.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PagenotfoundComponent,
    ForgotPasswordComponent,
    UsernotfoundComponent,
    EmployeedetailsComponent,
    EmployeeattendanceComponent,
    EmployeelistComponent,
    LeavetrackerComponent,
    ApplyLeaveComponent,
    OrganizationComponent,
    EmployeespaystubsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule,
    MaterialModule,
    DefaultModule,
    HttpClientModule,
    FormsModule,
    ModalModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
