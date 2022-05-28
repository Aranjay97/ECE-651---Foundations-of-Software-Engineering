import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/module.ts/module.ts.module';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  title = 'button-toggle-app';

  selectedValue : String[] = ["First"]

  toggleOptions: Array<String> = ["First", "Second"];

  selectionChanged(item) {
    console.log("Selected value: " + item.value);

    this.selectedValue.forEach(i => console.log(`Included Item: ${i}`));
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
