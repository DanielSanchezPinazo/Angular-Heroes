import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/auth/interfaces/user.interface';

import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent implements OnInit{

  constructor(
    private authService: AuthService,
    private router: Router
     ) {}

  ngOnInit(): void {

    // this.authService.checkAuthentication();
  }

  public sidebarItems = [
    { label: "Listado", icon: "label", url: "./list" },
    { label: "Añadir", icon: "add", url: "./new-hero" },
    { label: "Buscar", icon: "search", url: "./search" }
  ];

  get user(): User | undefined {

    return this.authService.currentUser;

  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl( "/auth" );
  }

}
