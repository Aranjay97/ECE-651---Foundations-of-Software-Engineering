import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-employeespaystubs',
  templateUrl: './employeespaystubs.component.html',
  styleUrls: ['./employeespaystubs.component.css']
})
export class EmployeespaystubsComponent implements OnInit {
  ID:any;
  paystub:any;
  response:any;
  submitted:boolean=false;
  isEditClicked:boolean=true;

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
  id(data){
    this.submitted=true;
    this.ID=data;
  }

  addpayment(){
    this.isEditClicked=false;
    const data = 
    { 
      Employee:this.ID,
      Basic_Salary: this.paystub.BasicSalary,
      Month_Salary_Paid: this.paystub.Month,
      Bank_Name: this.paystub.BankName,
      Account_Number: this.paystub.AccountNo,
      Tax_Applied: this.paystub.TaxApplied,
      Institution_Code: this.paystub.instCode,
    };
    console.log(data);
  this.LoginService.payment(data).subscribe(
    data=>{},
    (error) => {
      // this.showErrorMessage = true;
      console.log('Check In Failed');
  })
}

  @ViewChild('htmlData') htmlData!: ElementRef;
  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }

}
