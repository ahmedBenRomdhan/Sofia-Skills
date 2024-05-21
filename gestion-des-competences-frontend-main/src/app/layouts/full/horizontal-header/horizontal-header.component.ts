import {Component} from '@angular/core';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationService} from '../../../authentication/services/authentication.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-horizontal-header',
  templateUrl: './horizontal-header.component.html',
  styleUrls: []
})
export class HorizontalAppHeaderComponent {
  public config: PerfectScrollbarConfigInterface = {};

  constructor(private translate: TranslateService, private authService: AuthenticationService,
              private router: Router) {
    translate.setDefaultLang('en');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
