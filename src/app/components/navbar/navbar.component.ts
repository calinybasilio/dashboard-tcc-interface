import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { IAuthenticatedUser } from 'src/app/core/interfaces/authenticated-user.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  public user: IAuthenticatedUser;

  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private readonly _userService: UserService
  ) {
    this.location = location;
    this.user = this._userService.getdataSession().user;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }

  logout() {
    this._userService.logout();
    this.router.navigate(['/login']);
  }

}
