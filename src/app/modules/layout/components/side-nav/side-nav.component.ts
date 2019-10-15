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

  constructor(private layoutQuery: LayoutQuery) { }

  ngOnInit() {
    this.layoutQuery.showSideNav$.subscribe(showSideNav => showSideNav ? this.sidenav.open() : this.sidenav.close());
  }

}
