import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class_x: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'getting-started', title: 'Getting Started',  icon: 'info', class_x: '' },
    { path: 'dashboard', title: 'Dashboard',  icon: 'dashboard', class_x: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  parent_name: string;
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          this.parent_name = sessionStorage.getItem('name');
          return false;
      }
      return true;
  };
  LogOut(): void {
       document.location.href = 'https://www.ikolilu.com/portal/v1.4/';
  }
}
