import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LayoutQuery } from '../../state/layout.query';
import { LayoutService } from '../../state/layout.service';
import { LayoutState } from '../../state/layout.store';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(
    public layoutQuery: LayoutQuery,
    public layoutService: LayoutService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {

        const snapshotData = this.activatedRoute.firstChild.snapshot.data;
        const layoutState: LayoutState = {
          showSideNavIcon: snapshotData.showSideNavIcon !== false,
          showHeader: snapshotData.showHeader !== false,
          showSideNav: snapshotData.showSideNav !== false
        };

        this.layoutService.updateLayout(layoutState);
      }
    });
  }

  toggleSideNav() {
    this.layoutService.toggleSideNav();
  }

}
