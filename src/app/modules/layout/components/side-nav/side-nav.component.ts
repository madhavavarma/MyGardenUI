import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { LayoutQuery } from '../../state/layout.query';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  @ViewChild('sidenav', {static: true}) sidenav: MatSidenav;

  ngOnInit() {
    this.sidenav.open();
  }
}

