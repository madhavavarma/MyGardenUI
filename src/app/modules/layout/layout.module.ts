import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [HeaderComponent, SideNavComponent, LayoutComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [LayoutComponent]
})
export class LayoutModule { }
