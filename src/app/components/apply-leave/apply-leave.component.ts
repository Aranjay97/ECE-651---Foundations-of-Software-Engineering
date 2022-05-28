import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/module.ts/module.ts.module';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css']
})
export class ApplyLeaveComponent implements OnInit {
  today: number = Date.now();
  response:any;
  responseleaves:any;
  leavedetails:any;
  leavesavailable:boolean=false;
  respavailable:boolean=false;

  constructor(private LoginService: LoginService,sharedService: LoginService) {
    this.response = sharedService.getUserData()
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(this.dateObj);
    this.maxDate = new Date(currentYear, 11, 31);
    this.minDateTo = new Date(this.dateObj);
    this.maxDateTo = new Date(currentYear, 11, 31);

   }
  showErrorMessage = false;
  minDate: Date;
  maxDate: Date;
  minDateTo: Date;
  maxDateTo : Date;
  ngOnInit(): void {
      this.remainingleaves();
  }

  dateObj: number = Date.now();
  applyLeaveOnClick(){}
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  remainingleaves(){
      this.respavailable=true;
      const data = 
      { 
        Employee_id: this.response[0].Employee_id,
    };
      this.LoginService.getleaves(data).subscribe(
        data=>{
          this.responseleaves=data;
          this.leavesavailable=true;
        },
        (error) => {
          console.log('DELETE Failed');
      })
    }


  applyleaves(){
    const data = 
    {    
      Employee_id: this.response[0].Employee_id,
      From_Date:this.leavedetails.from,
      Leave_Type:this.leavedetails.Leave_Type,
      To_Date:this.leavedetails.To,
      Leave_Reason:this.leavedetails.reason,
      Status: "Submitted"
  };
  console.log(data);
    this.LoginService.getleaves(data).subscribe(
      data=>{
        console.log(data);
      },
      (error) => {
        console.log('DELETE Failed');
    })
  }

}
