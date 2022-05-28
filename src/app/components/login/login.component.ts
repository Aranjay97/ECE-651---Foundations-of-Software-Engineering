import {Component, OnInit} from '@angular/core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
  input:any;
  submitted=false;
  showErrorMessage = false;
  faUserCircle=faUserCircle;
  ngOnInit() {
    this.input= {
      Employee_id:'',
      Password:''
    }
  }
  constructor(private LoginService: LoginService,private router: Router) {
   }

  onLogin(){
    this.submitted=true;
    const data = {
      Employee_id: this.input.Employee_id,
      Password: this.input.Password
    };
    this.LoginService.loginUser(data).subscribe(
      data=>{
        if(data.Employee_id!=""){
          this.router.navigate(['/dashboard'])
          this.LoginService.setUserData(data);
        }
      },
      (error) => {
        this.showErrorMessage = true;
        console.log('Login Failed'); // handle login failed here. 
    }
    )
  }
   
  hide=true;
  numericPattern = /^[0-9]*$/;
  numericOnly(event){
     return this.numericPattern.test(event.key);
  }
  myGroup = new FormGroup({
    employeeID: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  })
}