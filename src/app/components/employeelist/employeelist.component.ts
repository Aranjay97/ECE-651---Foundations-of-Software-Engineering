import { Component, OnInit } from '@angular/core';
import { ModalService } from '../_modal';
import { LoginService } from 'src/app/service/login.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css']
})

export class EmployeelistComponent implements OnInit {
  input:any;
  delemp:any;
  addemp:any;
  submitted=false;
  showErrorMessage = false;
  showsuccessMessage = false;
  showAEErrorMessage = false;
  showAEsuccessMessage = false;
  constructor(private modalService: ModalService,private LoginService: LoginService,config: NgbModalConfig, private modalService2: NgbModal) { 
    config.backdrop = 'static';
    config.keyboard = false;
    // this.response = sharedService.getUserData()
  }

  open(content) {this.modalService2.open(content);}
  response:any;
  ngOnInit() {
    this.getAllEmployees();
    this.delemp= {
      Employee_id:'',
    }
    this.addemp= {
        }
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

  openModal(id: string) {this.modalService.open(id);}
  closeModal(id: string) {this.modalService.close(id);}

  addemployee(){
    this.submitted=true;
    const data = 
    { 
      Employee_details:{      
      First_Name: this.addemp.First_Name,
      Last_Name: this.addemp.Last_Name,
      Email_Id: this.addemp.Email_Id,
      Phone_Number: this.addemp.Phone_Number,
      Gender: this.addemp.Gender,
      Password: "qwerty123",
      Emergency_Contact_Name: this.addemp.Emergency_Contact_Name,
      Emergency_Contact_Number: this.addemp.Emergency_Contact_Number,
    },
    Work_details:{      
      Designation: this.addemp.Department,
      Date_of_Joining: this.addemp.Date_of_Joining,
      CTC: this.addemp.CTC,
      Department: this.addemp.Department,
      Employee_Status: this.addemp.Employee_Status,
      Reporting_To: this.addemp.Reporting_To,
      Employee_Type: this.addemp.Employee_Type,
      Work_Phone: this.addemp.Work_Phone,
        }
  };
    this.LoginService.addemployee(data).subscribe(
      data=>{
        this.showAEsuccessMessage = true;
        const data1 = 
        { 
          Casual_Available:10,
          Sick_Available:15,
          Employee:data[0].Employee_id,
        };
        this.LoginService.defaultleaves(data1).subscribe(
          data=>{
          },
          (error) => {
            console.log('Add leaves Failed');
        })
      },
      (error) => {
        this.showAEErrorMessage = true;
        console.log('Add Employee Failed');
    })
  }

  delemployee(){
    this.LoginService.delemployee(this.delemp.Employee_id).subscribe(
      data=>{
        this.showsuccessMessage = true;
      },
      (error) => {
        this.showErrorMessage = true;
        console.log('Delete Employee Failed');
    })
  }
  // delemployee(){
  //   const data = 
  //   { 
  //     Status_In_Company: "InActive",
  // };
  //   this.LoginService.changepdet(data,this.delemp.Employee_id).subscribe(
  //     data=>{
  //       this.showsuccessMessage = true;
  //     },
  //     (error) => {
  //       this.showErrorMessage = true;
  //       console.log('DELETE Failed');
  //   })
  // }
}
