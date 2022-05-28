import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { Observable } from 'rxjs';
let HTTP_OPTIONS;
const baseUrl = 'http://localhost:8000/api/login_employee';
const add_e_Url = 'http://localhost:8000/api/add_employee';
const del_e_Url = 'http://localhost:8000/api/delete_employee';
const cng_pwd_Url = 'http://localhost:8000/api/changeEmpPwd';
const pdetails="http://127.0.0.1:8000/api/personaldetails";
const ain="http://127.0.0.1:8000/api/attendance_in";
const aout="http://127.0.0.1:8000/api/attendance_out";
const cng_pdet_Url="http://127.0.0.1:8000/api/updatePersonalDetails";
const cng_wdet_Url="http://127.0.0.1:8000/api/updateWorkDetails";
const getAttendanceDetails="http://127.0.0.1:8000/api/getAttendanceDetails";
const getAll="http://127.0.0.1:8000/api/get_all_employees";
const addleaves="http://127.0.0.1:8000/api/addStaticLeaveDetails";
const addpayment="http://localhost:8000/api/payroll_month";
const getleave="http://127.0.0.1:8000/api/getLeaveDetails";

const httpOptions = {
  Headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  userData;
  constructor(private http: HttpClient) { 
    this.userData;
    HTTP_OPTIONS = {
      headers: new HttpHeaders(
      { "HeaderNameA": "HeaderValueA",
        "HeaderNameB": "HeaderValueB"
      })
    }
  }

  setUserData(val: object){
    this.userData= val;
  }
  getUserData(){
    return this.userData;
  }

  loginUser(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  attendance(data: any): Observable<any> {
    return this.http.post(getAttendanceDetails, data);
  }
  ain(data: any): Observable<any> {
    return this.http.post(ain, data);
  }
  aout(data: any): Observable<any> {
    return this.http.patch(aout, data);
  }
  personaldetails(id:any): Observable<any> {
    return this.http.get(`${pdetails}/${id}`);
  }
  addemployee(data: any): Observable<any> {
    return this.http.post(add_e_Url, data);
  }
  payment(data: any): Observable<any> {
    return this.http.post(addpayment, data);
  }
  delemployee(data: any): Observable<any> {
    return this.http.delete(`${del_e_Url}/${data}`);
  }
  changepwd(data: any,id:any): Observable<any> {
    return this.http.post(`${cng_pwd_Url}/${id}/`,data);
  }
  changepdet(data: any,id:any): Observable<any> {
    return this.http.put(`${cng_pdet_Url}/${id}/`,data);
  }
  changewdet(data: any,id:any): Observable<any> {
    return this.http.put(`${cng_wdet_Url}/${id}/`,data);
  }
  getAll(): Observable<any> {
    return this.http.get(getAll);
  }
  getleaves(data: any): Observable<any> {
    return this.http.post("http://127.0.0.1:8000/api/getLeaveDetails", data);
  }
  applyleave(data: any): Observable<any> {
    return this.http.post("http://127.0.0.1:8000/api/saveLeaveDetails", data);
  }
  
  defaultleaves(data: any): Observable<any> {
    return this.http.post(addleaves, data);
  }
  // getEmpAll(): Observable<any> {
  //   return this.http.get(getEmpAll);
  // }
}
