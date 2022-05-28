import { Component, ElementRef, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  Check_In: boolean =true;
  response : any;
  visible:boolean = false;
  isDisabled=false;
  today :any;
  filter_data:any;
  checkin:any;
  checkout:any;
  status:any;
  day = ["Sunday", "Monday", "Tuesday","Wednesday", "Thursday", "Friday","Saturday"];

  constructor(sharedService: LoginService,private LoginService: LoginService) { 
    this.response = sharedService.getUserData()
  }
  ngOnInit(): void {
    this.attendancecheck();
  }
  attendancecheck(){
    if(this.response){
    this.LoginService.attendance({Employee_id: this.response[0].Employee_id}).subscribe(
      data=>{
        this.filter_data=data.find((t:any)=>t.Date_col ===this.current_date().year);
        if(this.filter_data){
          if(!this.filter_data.Punch_In && !this.filter_data.Punch_Out){
            this.Check_In=true;
          }
          else if(this.filter_data.Punch_In && !this.filter_data.Punch_Out){
            this.Check_In=false;
          }
          else if(this.filter_data.Punch_In && this.filter_data.Punch_Out){
            this.isDisabled=true;
          }
        }
      },
    );
    }
  }

  

  onClick(){
    if(this.Check_In){
      this.check_in();
      this.visible=true;
      this.status='in';
      this.Check_In=false;
    }
    else{
      this.check_out();
      this.visible=true;
      this.status='out';
      this.isDisabled=true;
    }
  }

  current_date(){
    this.today = new Date();
    var mes = this.today.getMonth()+1;
    if(mes < 10) {
      var mes_u = '0' + mes;
    } else {
      mes_u = '' + mes;
    }
    if(this.today.getDate() < 10) {
      var today_u = '0' + this.today.getDate();
    } else {
      today_u = '' + this.today.getDate();
    }
    var fecha =this.today.getFullYear()+"-"+mes_u+"-"+today_u;
    return {year:fecha,date:this.today};
  }

  check_in(){
    const data = 
    { 
      Employee: this.response[0].Employee_id,
      Punch_In: this.current_date().date.toTimeString().slice(0,5),
      Date_col: this.current_date().year,
      Day_col: this.day[this.today.getDay()],
    };
  this.LoginService.ain(data).subscribe(
    data=>{},
    (error) => {
      // this.showErrorMessage = true;
      console.log('Check In Failed');
  })
}
check_out(){
  const data = 
  { 
    Employee_id: this.response[0].Employee_id,
    Punch_Out: this.current_date().date.toTimeString().slice(0,5),
    Date_col: this.current_date().year,
  };
  this.LoginService.aout(data).subscribe(
    data=>{},
    (error) => {
      // this.showErrorMessage = true;
      console.log('Check Out Failed');
  })
}
}

