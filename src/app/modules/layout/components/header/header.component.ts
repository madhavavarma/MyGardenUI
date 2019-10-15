import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../state/layout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private layoutService: LayoutService) { }

  ngOnInit() {
  }

  toggleSideNav() {
    this.layoutService.toggleSideNav();
  }

}
