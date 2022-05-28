import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DefaultComponent } from './components/default/default.component';
import { ContentComponent } from './components/content/content.component';
import { UsernotfoundComponent } from './components/usernotfound/usernotfound.component';
import { EmployeedetailsComponent } from './components/employeedetails/employeedetails.component';
import { EmployeeattendanceComponent } from './components/employeeattendance/employeeattendance.component';
import { EmployeelistComponent } from './components/employeelist/employeelist.component';
import { LeavetrackerComponent } from './components/leavetracker/leavetracker.component';
import { ApplyLeaveComponent } from './components/apply-leave/apply-leave.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { EmployeespaystubsComponent } from './components/employeespaystubs/employeespaystubs.component';
import { EmployeePayStubComponent } from './components/employee-pay-stub/employee-pay-stub.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'forgotpassword',component:ForgotPasswordComponent},
  {path:'',redirectTo:'/login', pathMatch:'full'},
  {path:'usernotfound',component:UsernotfoundComponent},
  {
    path: 'dashboard',
    component: DefaultComponent,
    children: [{path: '',component: DashboardComponent},
                {path: 'content',component: ContentComponent},    
                {path: 'employeedetails',component: EmployeedetailsComponent},
                {path: 'employeeattendance',component: EmployeeattendanceComponent},
                {path: 'employeelist',component: EmployeelistComponent},
                {path: 'leavetracker1',component: LeavetrackerComponent},
                {path: 'employeerpaystub',component: EmployeespaystubsComponent},
                {path: 'employeepaystub',component: EmployeePayStubComponent},
                {path: 'leavetracker',component: ApplyLeaveComponent},
                {path: 'Organization',component: OrganizationComponent},
              ]},
    {path:'**',component:PagenotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
