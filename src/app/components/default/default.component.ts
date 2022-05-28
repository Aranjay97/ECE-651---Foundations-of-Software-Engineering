import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../_modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})

export class DefaultComponent implements OnInit {
  response : any;
  public menuItems: any[];
  public isCollapsed = true;
  showErrorMessage = false;
  showsuccessMessage = false;
  cngpwd:any;
  isExpanded = false;
  element: HTMLElement;
  display:boolean=false;

  constructor(private modalService: ModalService,sharedService: LoginService,
              private router: Router,config: NgbModalConfig, private modalService2: NgbModal,
              private LoginService: LoginService) {
    this.response = sharedService.getUserData()
    config.backdrop = 'static';
    config.keyboard = false;
    }
  open(content) {this.modalService2.open(content);}
  ngOnInit() {
    this.cngpwd= {
      Password:'',
    }
    if(this.response){
      this.display=true;
    }
  }
  sideBarOpen = true;
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
// -------------sidenav toggle--------------
  toggleActive(event:any){
    event.preventDefault();
    if(this.element !== undefined){
      this.element.style.backgroundColor = "white";
    } 
    var target = event.currentTarget;
    target.style.backgroundColor = "#D3D3D3";
    this.element = target;
  }
// -------------Modal--------------
  openModal(id: string) {this.modalService.open(id);}
  closeModal(id: string){this.modalService.close(id);}
// -------------Change Password--------------
  changepwd(){
    this.LoginService.changepwd(this.cngpwd,this.response.Employee_id).subscribe(
      data=>{
        this.showsuccessMessage = true;
      },
      (error) => {
        this.showErrorMessage = true;
        console.log('Change Password Failed');
    })
  }
}