import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-employeedetails',
  templateUrl: './employeedetails.component.html',
  styleUrls: ['./employeedetails.component.css']
})
export class EmployeedetailsComponent implements OnInit {
  title = 'button-toggle-app';
  response : any;
  wemp : any;
  pemp : any;
  showErrorMessage;
  isToggleClicked = true;
  isEditClicked = true;
  display:boolean=false;
  
  constructor(private LoginService: LoginService,sharedService: LoginService) {
    this.response = sharedService.getUserData()
  }

  ngOnInit(): void {
    this.wemp= {}
    this.pemp= {}
    if(this.response){
      this.display=true;
    }
  }

  updatepemployee(){
    const data = 
    {    
      First_Name: !!this.pemp.First_Name ? this.pemp.First_Name : this.response[0].First_Name,
      Last_Name: !!this.pemp.Last_Name ? this.pemp.Last_Name : this.response[0].Last_Name,
      Email_Id: !!this.pemp.Email_Id ? this.pemp.Email_Id : this.response[0].Email_Id,
      Phone_Number: !!this.pemp.Phone_Number ? this.pemp.Phone_Number : this.response[0].Phone_Number,
      Emergency_Contact_Name: !!this.pemp.Emergency_Contact_Name ? this.pemp.Emergency_Contact_Name : this.response[0].Emergency_Contact_Name,
      Emergency_Contact_Number: !!this.pemp.Emergency_Contact_Number ? this.pemp.Emergency_Contact_Number : this.response[0].Emergency_Contact_Number,
      Gender: !!this.pemp.Gender ? this.pemp.Gender : this.response[0].Gender,
      Alternate_Email_Id: !!this.pemp.Alternate_Email_Id ? this.pemp.Alternate_Email_Id : this.response[0].Alternate_Email_Id,
      Marital_Status: !!this.pemp.Marital_Status ? this.pemp.Marital_Status : this.response[0].Marital_Status,

  };
    this.LoginService.changepdet(data,this.response[0].Employee_id).subscribe(
      data=>{},
      (error) => {
        this.showErrorMessage = true;
        console.log('Update Personal Details Failed');
    })
  }

  updatewemployee(){
    const data = 
    {
      Designation:!!this.wemp.Designation ? this.wemp.Designation : this.response[1].Designation,
      Date_of_Joining:!!this.wemp.Date_of_Joining ? this.wemp.Date_of_Joining : this.response[1].Date_of_Joining,
      CTC:!!this.wemp.CTC ? this.wemp.v : this.response[1].CTC,
      Department:!!this.wemp.Department ? this.wemp.Department : this.response[1].Department,
      Employee_Status:!!this.wemp.Employee_Status ? this.wemp.Employee_Status : this.response[1].Employee_Status,
      Reporting_To:!!this.wemp.Reporting_To ? this.wemp.Reporting_To : this.response[1].Reporting_To,
      Employee_Type:!!this.wemp.Employee_Type ? this.wemp.Employee_Type : this.response[1].Employee_Type,
      Work_Phone:!!this.wemp.Work_Phone ? this.wemp.Work_Phone : this.response[1].Work_Phone,
  };
  console.log(data);
    this.LoginService.changewdet(data,this.response[0].Employee_id).subscribe(
      data=>{},
      (error) => {
        this.showErrorMessage = true;
        console.log('Update Work Details Failed');
    })
  }
}