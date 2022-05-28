import { Component, OnInit ,ViewChild, ElementRef } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-employee-pay-stub',
  templateUrl: './employee-pay-stub.component.html',
  styleUrls: ['./employee-pay-stub.component.css']
})
export class EmployeePayStubComponent implements OnInit {
  @ViewChild('htmlData') htmlData!: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }
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
