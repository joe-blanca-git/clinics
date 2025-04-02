import { Component, OnInit, ViewChild } from '@angular/core';
// import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SideMenuComponent } from '../components/side-menu/side-menu.component';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'admin-root',
  templateUrl: './admin.app.component.html',
  styleUrls: ['./admin.app.component.scss'],
})
export class AdminAppComponent implements OnInit {
  @ViewChild(SideMenuComponent) sideMenuComponent!: SideMenuComponent;
  //   @ViewChild(AdminHomeComponent) cardMenuHome!: AdminHomeComponent;

  isCollapsed = false;
  visibleMenu = false;
  user = 'admin@admin.com.br';

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  isAuthenticated(): boolean {    
    if (this.authService.loggedIn) {
      return true;
    }
    return false;
  }

  getLogo(): string {
    const logoBase = 'assets/img/logo/';
    if (!this.isCollapsed) {
      return `${logoBase}logo-clinics.png`;
    }

    if (this.isCollapsed) {
      return `${logoBase}logo-clinics-sm.png`;
    }

    return `${logoBase}logo-clinics-sm.png`;
  }

  logout() {
    this.authService.logout();
    this.isAuthenticated();
  }

  redirect(route: string): void {
    this.router.navigate([route]);
  }

  openMenu(): void {
    this.visibleMenu = true;
  }

  closeMenu(): void {
    this.visibleMenu = false;
  }
}
