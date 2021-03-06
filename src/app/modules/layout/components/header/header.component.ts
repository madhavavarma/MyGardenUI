import { Component, OnInit, Input } from '@angular/core';
import { LayoutService } from '../../state/layout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() showSideNavIcon: boolean;
  @Input() toggleSideNav: () => void;
}
