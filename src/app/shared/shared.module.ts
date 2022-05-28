import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../module.ts/module.ts.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    //HighchartsChartModule,
    MaterialModule
  ],
  exports: [
  ]
})
export class SharedModule { }
