import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularA11yDialogComponent } from './angular-a11y-dialog.component';
import { PortalHostComponent } from './portal-host/portal-host.component';

@NgModule({
  declarations: [
    AngularA11yDialogComponent,
    PortalHostComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AngularA11yDialogComponent
  ]
})
export class AngularA11yDialogModule { }
