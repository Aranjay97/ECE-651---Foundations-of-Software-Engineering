import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  response:any;
  constructor(sharedService: LoginService,private LoginService: LoginService) { }

  ngOnInit(): void {
    this.getAllEmployees();
  }
  getAllEmployees(){
    this.LoginService.getAll().subscribe(
      data=>{
        this.response=data;
      },
      (error) => {
        // this.showErrorMessage = true;
        console.log('Check Out Failed');
    })
  }
  updatepemployee(){
    const data = 
    {    
      Status_In_Company: "InActive",
  };
    this.LoginService.changepdet(data,this.response[0].Employee_id).subscribe(
      data=>{},
      (error) => {
        console.log('DELETE Failed');
    })
  }
}
