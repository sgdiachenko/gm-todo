import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { NotificationComponent } from './components/notification/notification.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    NotificationComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    BrowserAnimationsModule
  ],
  exports: [
    NotificationComponent,
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
